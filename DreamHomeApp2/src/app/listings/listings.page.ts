import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// Firebase modular SDK to load properties from Firestore
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
  standalone: true,
  imports: [
    IonicModule,   // Provides Ionic components
    CommonModule,  // Provides common Angular directives (ngIf, ngFor, etc.)
    FormsModule,   // Allows use of ngModel for two-way binding
    RouterModule   // Enables navigation with routerLink
  ]
})
export class ListingsPage {

  // Holds the currently selected segment value (buy/rent)
  selectedOption: string = 'buy';

  // Keep the original hard-coded properties as default content
  defaultProperties: any[] = [
    {
      id: 1,
      title: 'Luxury Villa',
      location: 'Dublin',
      price: '€1,000,000',
      type: 'buy',
      image: 'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg'
    },
    {
      id: 2,
      title: 'Modern Apartment',
      location: 'Cork',
      price: '€1800/month',
      type: 'rent',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    },
    {
      id: 3,
      title: 'Cozy Cottage',
      location: 'Galway',
      price: '€500,000',
      type: 'buy',
      image: 'https://i.ytimg.com/vi/nOWuGCGtz9Q/maxresdefault.jpg'
    },
    {
      id: 4,
      title: 'Beach House',
      location: 'Kerry',
      price: '€1,200,000',
      type: 'buy',
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
    },
    {
      id: 5,
      title: 'City Loft',
      location: 'Dublin',
      price: '€1,500/month',
      type: 'rent',
      image: 'https://sleepwithusproperties.com/wp-content/uploads/2016/10/CITY-LIVING-SPACE.jpg'
    },
    {
      id: 6,
      title: 'Suburban Home',
      location: 'Limerick',
      price: '€350,000',
      type: 'buy',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    },
    {
      id: 7,
      title: 'Penthouse Suite',
      location: 'Dublin',
      price: '€3,000/month',
      type: 'rent',
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/111-west-57th-street-quadplex-80-2-credit-to-hayes-davidson.jpg?c=original'
    },
    {
      id: 8,
      title: 'Countryside Villa',
      location: 'Meath',
      price: '€900,000',
      type: 'buy',
      image: 'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg'
    }
  ];

  // Array containing the featured properties to display on the page (starts with hardcoded defaults)
  featuredProperties: any[] = [...this.defaultProperties];

  // Firestore instance
  private db: any;

  // Inject Angular Router for navigation between pages
  constructor(private router: Router) {
    // Initialize Firebase once and create Firestore instance
    if (!getApps().length) {
      initializeApp(environment.firebase);
    }
    this.db = getFirestore();
    // Initial load (also refreshed when page becomes active)
    this.loadProperties();
  }

  // Load properties from Firestore collection 'properties'
  async loadProperties() {
    try {
      const snapshot = await getDocs(collection(this.db, 'properties'));
      const fetched = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        // Normalize type to lowercase string if present
        const rawType = data && (data.type || data['type']);
        const normalizedType = rawType ? String(rawType).toLowerCase() : null;
        return {
          id: doc.id,
          title: data.title || 'No title',
          location: data.location || '',
          price: data.price ? (typeof data.price === 'number' ? `€${data.price}` : data.price) : '',
          type: normalizedType,
          image: data.image || 'assets/placeholder.jpg',
          raw: data
        };
      });

      // Merge Firestore results after the default (hard-coded) properties
      this.featuredProperties = [...this.defaultProperties, ...fetched];
    } catch (error) {
      console.error('Error loading properties from Firestore:', error);
    }
  }

  // Ionic lifecycle: called when the page is about to become active
  async ionViewWillEnter() {
    await this.loadProperties();
  }

  // Method to navigate back to the Home page
  goBack() {
    this.router.navigate(['/home']);
  }

}


