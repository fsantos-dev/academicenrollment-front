import { Component, inject, output, signal } from '@angular/core';
import { AuthStore } from '../../../core/auth/auth.store';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenuOption } from '../models/layout-model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_CONFIG } from '../../../core/config/app.config';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [DrawerModule, ButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-layout.html',
  styleUrl: './sidebar-layout.scss',
})
export class SidebarLayout {
  public readonly authStore = inject(AuthStore);
  public visible = signal(true);
  public isOpen = output<void>();
  public version = APP_CONFIG.appVersion;

  menuOptions : MenuOption[] = [
    { id: 1, label:'Registro de materias', icon:'pi pi-list', route: '/subject-register'},
    { id: 2, label:'Asignaturas inscritas', icon:'pi pi-file-plus', route: '/subject-summary'},
  ];

  close(): void {
    this.visible.set(false);
  }
}
