import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dash-board',
  imports: [
    CardModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  dashboardItems = [
    {
      title: 'Resumen',
      description: 'Ver el resumen de tareas, tiempos e interrupciones.',
      icon: 'pi pi-chart-bar',
      route: '/pages/resumen'
    },
    {
      title: 'Tiempo Real',
      description: 'Registrar el tiempo dedicado a una tarea.',
      icon: 'pi pi-clock',
      route: '/pages/tiempo-real'
    },
    {
      title: 'Interrupciones',
      description: 'Gestionar las interrupciones durante el trabajo.',
      icon: 'pi pi-ban',
      route: '/pages/interrupciones'
    },
    {
      title: 'Nuevo Script',
      description: 'Registrar un nuevo script de desarrollo.',
      icon: 'pi pi-plus-circle',
      route: '/pages/nuevo-script'
    },
    {
      title: 'Tabla de Scripts',
      description: 'Visualizar todos los scripts guardados.',
      icon: 'pi pi-table',
      route: '/pages/tabla-scripts'
    }
  ];

  navigateTo(route: string) {
    // Usa Router para navegar
    console.log(route)
    this.router.navigate([route]);
  }

  constructor(private router: Router) { }
}
