import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

// Bootstrap the standalone AppComponent and bring in any providers
// declared in the existing AppModule (Firebase, Ionic providers, etc.)
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppModule)]
}).catch(err => console.error(err));