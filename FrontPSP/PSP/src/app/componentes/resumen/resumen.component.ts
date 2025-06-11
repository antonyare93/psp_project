import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-resumen',
  imports: [
    CardModule,
    TableModule
  ],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent {
  resumen = [
    { tarea: 'Login', duracion: 120, interrupciones: 3 },
    { tarea: 'Dashboard', duracion: 90, interrupciones: 1 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
