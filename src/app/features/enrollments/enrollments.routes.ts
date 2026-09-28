// src/app/features/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { EnrollmentsListPage } from './pages/enrollments-list/enrollments-list.page';


export const ENROLLMENTS_ROUTES: Routes = [
  {
    path: '',
    component: EnrollmentsListPage,
  },
];
