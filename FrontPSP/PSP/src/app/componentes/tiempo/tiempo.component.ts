import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-tiempo',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule
  ],
  templateUrl: './tiempo.component.html',
  styleUrl: './tiempo.component.scss'
})
export class TiempoComponent {
  tareas = [{ id: 1, descripcion: 'Implementar autenticación' }];
  usuarios = [{ id: 1, nombre: 'Sergio Castro' }];
  registro = { tareaId: null, duracion: null, usuarioId: null };

  guardar() {
    console.log('Guardado:', this.registro);
  }
}
