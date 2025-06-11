import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-nuevo-script',
  imports: [
    CardModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './nuevo-script.component.html',
  styleUrl: './nuevo-script.component.scss'
})
export class NuevoScriptComponent {
  etapas = [{ id: 1, nombre: 'Diseño' }, { id: 2, nombre: 'Codificación' }];
  usuarios = [{ id: 1, nombre: 'Sergio Castro' }];
  script = { descripcion: '', etapaId: null, usuarioId: null };

  guardar() {
    console.log('Script guardado:', this.script);
  }
}
