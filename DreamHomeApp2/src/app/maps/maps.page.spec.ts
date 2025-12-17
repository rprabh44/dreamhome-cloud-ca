import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MapsModule } from './maps.module';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MapsModule ]
})
export class MapsPage implements OnInit {
  lat: number = 37.7749;  // Default latitude (San Francisco)
  lng: number = -122.4194; // Default longitude (San Francisco)
  zoom: number = 12;           // Default zoom level  
  constructor() { }

  ngOnInit() {
  }
}

