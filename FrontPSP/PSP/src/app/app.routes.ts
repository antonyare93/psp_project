import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { InterrupcionesComponent } from './componentes/interrupciones/interrupciones.component';
import { TiempoComponent } from './componentes/tiempo/tiempo.component';
import { NuevoScriptComponent } from './componentes/nuevo-script/nuevo-script.component';
import { TablaScriptsComponent } from './componentes/tabla-scripts/tabla-scripts.component';
import { DashBoardComponent } from './componentes/dash-board/dash-board.component';

export const routes: Routes = [
  {
    path: 'pages',
    component: LayoutComponent,
    children: [
      { path: 'dashBoard', component: DashBoardComponent },
      { path: 'resumen', component: ResumenComponent },
      { path: 'tiempo-real', component: TiempoComponent },
      { path: 'interrupciones', component: InterrupcionesComponent },
      { path: 'nuevo-script', component: NuevoScriptComponent },
      { path: 'tabla-scripts', component: TablaScriptsComponent },
    ]
  },
];
