import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { httpLoggerInterceptor } from './core/interceptors/http-logger.interceptor';
import { definePreset } from '@primeuix/themes';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f8ebe7',
      100: '#f0d8d1',
      200: '#e5b9ae',
      300: '#d89a8b',
      400: '#c97966',
      500: '#B35A3A',
      600: '#a14f32',
      700: '#8c442b',
      800: '#763923',
      900: '#602e1d',
      950: '#431f14'
    }
  }
});
export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, httpLoggerInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: MyPreset
      }
    })
  ]
};
