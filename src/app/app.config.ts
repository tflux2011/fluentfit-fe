import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { apiClientInterceptor } from './api-client.interceptor';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([apiClientInterceptor])),
    importProvidersFrom(BrowserModule),
    provideRouter(routes)
  ]
};