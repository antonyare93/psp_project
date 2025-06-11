import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-tabla-scripts',
  imports: [
    CardModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule
  ],
  templateUrl: './tabla-scripts.component.html',
  styleUrl: './tabla-scripts.component.scss'
})
export class TablaScriptsComponent {
  scripts = [
    { descripcion: 'Diseño de interfaz', etapa: 'Diseño', usuario: 'Sergio Castro' },
    { descripcion: 'Lógica de backend', etapa: 'Codificación', usuario: 'Sergio Castro' }
  ];
}
