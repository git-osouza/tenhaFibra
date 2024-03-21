import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarouselModule } from 'ngx-bootstrap/carousel';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule.forRoot(), CarouselModule.forRoot())]
};
