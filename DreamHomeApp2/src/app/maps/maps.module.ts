import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from 'ng-agm-core-lib';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDwXErdQrwQ2xc7BBKk2TNBJ5-Xl0YSf3Q',
    }),
  ],
  exports: [AgmCoreModule],
})
export class MapsModule {}
 
