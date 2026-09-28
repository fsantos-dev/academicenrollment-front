import { Routes } from '@angular/router';
import { publicGuard } from './core/guards/public.guard';
import { authGuard } from './core/guards/auth.guard';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  { path: 'enrollments', 
    canActivate: [authGuard],
    component: MainLayout,
    children: [
      {
        path:'',
        loadChildren : () => import('./features/enrollments/enrollments.routes').then(m => m.ENROLLMENTS_ROUTES)
      }
    ]
  },
    {
    path: '**',
    redirectTo: 'enrollments'
  }
];
