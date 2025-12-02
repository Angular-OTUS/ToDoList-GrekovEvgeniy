import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { mainLayoutRoutes } from './components/main-layout/main-layout.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(mainLayoutRoutes),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
  ],
};
