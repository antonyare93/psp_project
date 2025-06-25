import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dash-board',
  imports: [
    CardModule,
    ChartModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  data: any;
  options: any;
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


  platformId = inject(PLATFORM_ID);
  constructor(private router: Router, private cd: ChangeDetectorRef) { }
  navigateTo(route: string) {
    console.log(route)
    this.router.navigate([route]);
  }

  ngOnInit() {
    this.initChart();
  }
  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        labels: [ 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Tiempo real',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500')
          },
          {
            label: 'Interrupciones',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--p-orange-500')
          },
          {
            label: 'Scripts',
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            tension: 0.4,
            backgroundColor: 'rgba(107, 114, 128, 0.2)'
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
      this.cd.markForCheck();
    }
  }
}
