from sqlmodel import SQLModel, Field, Relationship

class Tipo_usuario(SQLModel, table=True):
    __tablename__ = "tipo_usuario"
    id: int = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, nullable=False)

class Etapa(SQLModel, table=True):
    __tablename__ = "etapa"
    id: int = Field(default=None, primary_key=True)
    descripcion: str = Field(index=True, nullable=False)

class Interrupcion(SQLModel, table=True):
    __tablename__ = "interrupcion"
    id: int = Field(default=None, primary_key=True)
    duracion: int = Field(nullable=False)
    motivo: str = Field(nullable=False)

class Finalizacion(SQLModel, table=True):
    __tablename__ = "finalizacion"
    id: int = Field(default=None, primary_key=True)
    duracion: int = Field(nullable=False)

class Usuario(SQLModel, table=True):
    __tablename__ = "usuario"
    id: int = Field(default=None, primary_key=True)
    nombres: str = Field(index=True, nullable=False)
    apellidos: str = Field(index=True, nullable=False)
    correo: str = Field(index=True, nullable=False)
    username: str = Field(index=True, nullable=False)
    tipo_usuario_id: int = Field(foreign_key="tipo_usuario.id")
    tipo_usuario: Tipo_usuario = Relationship(back_populates="usuarios")

class Tarea(SQLModel, table=True):
    __tablename__ = "tarea"
    id: int = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, nullable=False)
    descripcion: str = Field(nullable=False)
    duracion: int = Field(nullable=False)
    etapa_id: int = Field(foreign_key="etapa.id")
    etapa: Etapa = Relationship(back_populates="tareas")
    usuario_id: int = Field(foreign_key="usuario.id")
    usuario: Usuario = Relationship(back_populates="tareas")
    interrupcion_id: int = Field(foreign_key="interrupcion.id")
    interrupcion: Interrupcion = Relationship(back_populates="tareas")
    finalizacion_id: int = Field(foreign_key="finalizacion.id")
    finalizacion: Finalizacion = Relationship(back_populates="tareas")