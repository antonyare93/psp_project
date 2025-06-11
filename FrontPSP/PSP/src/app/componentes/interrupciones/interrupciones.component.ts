import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-interrupciones',
  imports: [
    CardModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './interrupciones.component.html',
  styleUrl: './interrupciones.component.scss'
})
export class InterrupcionesComponent {
tareas = [{ id: 2, descripcion: 'Corrección de bugs' }];
  interrupcion = { tareaId: null, duracion: null, motivo: '' };

  registrar() {
    console.log('Interrupción registrada:', this.interrupcion);
  }
}
