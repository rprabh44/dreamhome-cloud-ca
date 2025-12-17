// Importing Angular & Ionic modules
import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Firebase modular SDK for loading Firestore documents when needed
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
  standalone: true,

  // IMPORTANT: all Ionic components used in the HTML MUST be imported here
  imports: [
    IonicModule,      // <-- FIX: Needed for ion-header, ion-content, ion-card, etc.
    CommonModule,     // ngIf, ngFor, pipes
    RouterModule,     // routerLink + navigation
    //TitleCasePipe     // Needed for | titlecase in the HTML
  ]
})
export class PropertyPage {
  property: any;

   propertyId = '';
  private db: any;
  isLoggedIn = false;


  // Inject route to get property ID & router to navigate back
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Receive property ID from URL
    const idParam = this.route.snapshot.paramMap.get('id'); // Get id from route

    this.propertyId = idParam || ''; // Store propertyId for booking link

    // Load property data manually (hard-coded defaults)
    const allProperties = [
      { id: 1, title: 'Luxury Villa', location: 'Dublin', price: '€1,000,000', type: 'buy', image: 'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg' },
      { id: 2, title: 'Modern Apartment', location: 'Cork', price: '€800/month', type: 'rent', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
      { id: 3, title: 'Cozy Cottage', location: 'Galway', price: '€500,000', type: 'buy', image: 'https://i.ytimg.com/vi/nOWuGCGtz9Q/maxresdefault.jpg' },
      { id: 4, title: 'Beach House', location: 'Kerry', price: '€1,200,000', type: 'buy', image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg' },
      { id: 5, title: 'City Loft', location: 'Dublin', price: '€1,500/month', type: 'rent', image: 'https://sleepwithusproperties.com/wp-content/uploads/2016/10/CITY-LIVING-SPACE.jpg' },
      { id: 6, title: 'Suburban Home', location: 'Limerick', price: '€350,000', type: 'buy', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
      { id: 7, title: 'Penthouse Suite', location: 'Dublin', price: '€3,000/month', type: 'rent', image: 'https://media.cnn.com/api/v1/images/stellar/prod/111-west-57th-street-quadplex-80-2-credit-to-hayes-davidson.jpg?c=original' },
      { id: 8, title: 'Countryside Villa', location: 'Meath', price: '€900,000', type: 'buy', image: 'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg' }
    ];

    // Try to find the property in the hard-coded defaults first
    const found = allProperties.find(p => String(p.id) === String(idParam));
    if (found) {
      this.property = found;
      return;
    }

    // If not found in defaults, try to load from Firestore using the idParam as document ID
    if (idParam) {
      // Initialize Firebase if needed
      if (!getApps().length) {
        initializeApp(environment.firebase);
      }
      this.db = getFirestore();

      // Fetch the document
      getDoc(doc(this.db, 'properties', idParam))
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.data() as any;
            const rawType = data && (data['type'] || data.type);
            this.property = {
              id: snapshot.id,
              title: data['title'] || 'No title',
              location: data['location'] || '',
              price: data['price'] ? (typeof data['price'] === 'number' ? `€${data['price']}` : data['price']) : '',
              type: rawType ? String(rawType).toLowerCase() : null,
              image: data['image'] || 'assets/placeholder.jpg',
              raw: data
            };
          } else {
            console.warn('Property document not found in Firestore:', idParam);
          }
        })
        .catch(err => {
          console.error('Error fetching property from Firestore:', err);
        });
        
    }
    const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  this.isLoggedIn = !!user;
});

  }
  // Back button function
  goBack() {
    this.router.navigate(['/listings']);
  }



}
