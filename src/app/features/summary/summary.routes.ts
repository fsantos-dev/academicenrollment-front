// src/app/features/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { SummaryListPage } from '../summary/pages/summary-list/summary-list.page';


export const SUMMARY_ROUTES: Routes = [
  {
    path: '',
    component: SummaryListPage,
  },
];
