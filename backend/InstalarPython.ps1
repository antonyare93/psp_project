
<#
.SYNOPSIS
    Script para descargar e instalar Python 3.12.10 en Windows.
.DESCRIPTION
    Este script automatiza la descarga del instalador de Python 3.12.10,
    lo ejecuta de forma silenciosa para todos los usuarios y agrega Python al PATH.
    Finalmente, verifica la instalación y limpia el archivo instalador.
.NOTES
    Ejecutar como Administrador si `InstallForAllUsers=1` causa problemas de permisos,
    aunque usualmente el propio instalador solicitará elevación si es necesario.
#>

# Variables
$PythonVersion = "3.12.10"
$InstallerUrl = "https://www.python.org/ftp/python/$PythonVersion/python-$PythonVersion-amd64.exe" # Construye la URL dinámicamente
$InstallerName = "python-installer.exe"
$InstallPath = "$env:ProgramFiles\Python$($PythonVersion.Replace('.', ''))" # Ruta de instalación típica para InstallForAllUsers=1

# --- PASO 1: Descargar el instalador de Python ---
Write-Host "Paso 1: Descargando Python $PythonVersion desde $InstallerUrl..."
try {
    Invoke-WebRequest -Uri $InstallerUrl -OutFile $InstallerName -ErrorAction Stop
    Write-Host "Descarga completada: $InstallerName"
}
catch {
    Write-Error "Error al descargar Python. Verifica la URL o tu conexión a internet."
    Write-Error $_.Exception.Message
    exit 1 # Termina el script si la descarga falla
}

# --- PASO 2: Ejecutar el instalador ---
Write-Host "Paso 2: Instalando Python $PythonVersion..."
# Argumentos para una instalación silenciosa, para todos los usuarios, y agregando al PATH.
# TargetDir es opcional si quieres especificar una ruta de instalación diferente y InstallForAllUsers=0.
# Con InstallForAllUsers=1, por defecto se instala en Program Files.
$ArgumentList = "/quiet InstallForAllUsers=1 PrependPath=1 Include_test=0"
# $ArgumentList = "/quiet InstallForAllUsers=1 PrependPath=1 Include_test=0 TargetDir=$InstallPath" # Ejemplo con TargetDir

try {
    Write-Host "Ejecutando: $InstallerName $ArgumentList"
    Start-Process -FilePath ".\$InstallerName" -ArgumentList $ArgumentList -Wait -PassThru -ErrorAction Stop
    Write-Host "Instalación de Python completada."
}
catch {
    Write-Error "Error durante la instalación de Python."
    Write-Error $_.Exception.Message
    # Podrías querer limpiar el instalador aquí también si la instalación falla.
    # Remove-Item ".\$InstallerName" -ErrorAction SilentlyContinue
    exit 1 # Termina el script si la instalación falla
}

# --- PASO 3: Verificar la instalación ---
# Es importante notar que los cambios en el PATH pueden requerir reiniciar PowerShell
# o incluso la máquina para que sean efectivos en la sesión actual del script.
# Esta verificación podría no funcionar inmediatamente en la misma sesión de script
# sin antes recargar las variables de entorno del PATH.

Write-Host "Paso 3: Verificando la instalación (puede requerir una nueva sesión de PowerShell para que el PATH se actualice)..."

# Intento de recargar el PATH para la sesión actual (puede no ser 100% efectivo en todos los casos)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

# Verificar Python
$pythonPath = Get-Command python -ErrorAction SilentlyContinue
if ($pythonPath) {
    Write-Host "Python encontrado en: $($pythonPath.Source)"
    $versionInfo = (python --version 2>&1) # Captura la salida estándar y de error
    Write-Host "Versión de Python: $versionInfo"
    if ($versionInfo -notmatch $PythonVersion) {
        Write-Warning "La versión de Python instalada ($versionInfo) no coincide exactamente con la esperada ($PythonVersion)."
    }
}
else {
    Write-Warning "Comando 'python' no encontrado. Puede que necesites abrir una nueva ventana de PowerShell o reiniciar tu sistema para que los cambios en el PATH surtan efecto."
}

# Verificar Pip
$pipPath = Get-Command pip -ErrorAction SilentlyContinue
if ($pipPath) {
    Write-Host "Pip encontrado en: $($pipPath.Source)"
    $pipVersionInfo = (pip --version 2>&1)
    Write-Host "Información de Pip: $pipVersionInfo"
}
else {
    Write-Warning "Comando 'pip' no encontrado. Puede que necesites abrir una nueva ventana de PowerShell o reiniciar tu sistema."
}

# ... (código hasta la limpieza del instalador) ...

# --- PASO 4: Limpiar el instalador ---
Write-Host "Paso 4: Limpiando el archivo instalador..."
try {
    Remove-Item ".\$InstallerName" -Force -ErrorAction Stop
    Write-Host "Instalador '$InstallerName' eliminado."
}
catch {
    Write-Error "Error al eliminar el archivo instalador '$InstallerName'."
    Write-Error $_.Exception.Message
}

# --- PASO 5: Intentar crear entorno virtual e instalar dependencias ---
Write-Host "Paso 5: Configurando entorno virtual e instalando dependencias..."
Write-Host "ADVERTENCIA: Los siguientes pasos podrían fallar si el PATH de Python no se ha actualizado en esta sesión."
Write-Host "Si fallan, por favor, ejecuta estos comandos manualmente en una NUEVA ventana de PowerShell."

$PythonExecutablePath = ""
# Intento más robusto de encontrar Python recién instalado
if (Test-Path "$env:ProgramFiles\Python$($PythonVersion.Replace('.', ''))\python.exe") {
    # Ruta común para InstallForAllUsers=1
    $PythonExecutablePath = "$env:ProgramFiles\Python$($PythonVersion.Replace('.', ''))\python.exe"
}
elseif (Test-Path "$env:LOCALAPPDATA\Programs\Python\Python$($PythonVersion.Replace('.', ''))\python.exe") {
    # Ruta común para InstallForCurrentUser
    $PythonExecutablePath = "$env:LOCALAPPDATA\Programs\Python\Python$($PythonVersion.Replace('.', ''))\python.exe"
}
else {
    # Intenta con el comando 'python' que podría estar en el PATH recargado
    $pythonCmd = Get-Command python -ErrorAction SilentlyContinue
    if ($pythonCmd) {
        $PythonExecutablePath = $pythonCmd.Source
    }
}

if (-not [string]::IsNullOrEmpty($PythonExecutablePath) -and (Test-Path $PythonExecutablePath)) {
    Write-Host "Python encontrado en: $PythonExecutablePath"
    Write-Host "Intentando crear entorno virtual '.venv'..."
    try {
        & $PythonExecutablePath -m venv .venv
        Write-Host "Entorno virtual '.venv' creado."

        Write-Host "Activando entorno virtual..."
        # Para PowerShell, el script de activación es Activate.ps1
        # El siguiente comando ejecuta el script de activación en el scope actual.
        . .\.venv\Scripts\Activate.ps1
        # NOTA: Los efectos de la activación (como el cambio de prompt) pueden no ser visibles
        #       inmediatamente o comportarse igual que en una sesión interactiva,
        #       pero el PATH del venv debería estar activo para los siguientes comandos.

        if (Test-Path ".\requirements.txt") {
            Write-Host "Archivo 'requirements.txt' encontrado. Instalando dependencias..."
            pip install -r requirements.txt # pip ahora debería ser el del venv
            Write-Host "Dependencias instaladas."
        }
        else {
            Write-Warning "Archivo 'requirements.txt' no encontrado. Omite la instalación de dependencias."
        }
    }
    catch {
        Write-Error "Error durante la creación del entorno virtual o la instalación de dependencias."
        Write-Error $_.Exception.Message
        Write-Warning "Por favor, intenta estos pasos manualmente en una nueva ventana de PowerShell:"
        Write-Warning "1. Navega a tu directorio de proyecto."
        Write-Warning "2. '$PythonExecutablePath -m venv .venv' (o 'python -m venv .venv' si el PATH global funciona)"
        Write-Warning "3. '.\.venv\Scripts\Activate.ps1'"
        Write-Warning "4. 'pip install -r requirements.txt' (si tienes requirements.txt)"
    }
}
else {
    Write-Warning "No se pudo determinar la ruta al ejecutable de Python recién instalado."
    Write-Warning "Omite la creación del entorno virtual y la instalación de dependencias."
    Write-Warning "Por favor, realiza estos pasos manualmente en una nueva ventana de PowerShell."
}

Write-Host "Script finalizado."
Write-Host "IMPORTANTE: Si 'python' o 'pip' no se reconocen globalmente, por favor, cierra y vuelve a abrir PowerShell, o reinicia tu computadora."