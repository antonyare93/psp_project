import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DashBoardComponent } from "../componentes/dash-board/dash-board.component";
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-layout',
  imports: [
    MenubarModule,
    DropdownModule,
    FormsModule,
    RouterModule,
    CardModule,
    DashBoardComponent,
    ButtonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  selectedUser: any;
  usuarios = [
    { id: 1, nombre: 'Sergio Castro', tipo: 'Desarrollador' },
    { id: 2, nombre: 'Ana Pérez', tipo: 'Analista' },
  ];
  constructor(private router: Router) { }
  onUsuarioChange() {
    console.log('Usuario cambiado:', this.selectedUser);
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }
  irADashboard() {
    console.log('ins')
    this.router.navigate(['/pages/dashBoard']); // ajusta la ruta según tu sistema
  }
}
