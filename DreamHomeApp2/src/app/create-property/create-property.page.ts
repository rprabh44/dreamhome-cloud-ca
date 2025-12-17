import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Firebase Web SDK
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.page.html',
  styleUrls: ['./create-property.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreatePropertyPage {

  property = {
    title: '',
    location: '',
    type: 'buy',      // buy | rent
    price: '',
    description: '',
    image: ''
  };

  private db: any;
  private auth: any;

  constructor(
    private router: Router,
    private toastCtrl: ToastController
  ) {
    // Initialise Firebase once
    if (!getApps().length) {
      initializeApp(environment.firebase);
    }

    this.db = getFirestore();
    this.auth = getAuth();
  }

  isFormValid(): boolean {
    return (
      this.property.title.trim() !== '' &&
      this.property.location.trim() !== '' &&
      this.property.price !== '' &&
      this.property.type !== ''
    );
  }

  async submitProperty() {
    console.log('Submit clicked', this.property);

    if (!this.isFormValid()) {
      const toast = await this.toastCtrl.create({
        message: 'Please fill all required fields',
        duration: 2000
      });
      await toast.present();
      return;
    }

    try {
      const user = this.auth.currentUser;

      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      await addDoc(collection(this.db, 'properties'), {
        title: this.property.title,
        location: this.property.location,
        type: this.property.type,
        price: Number(this.property.price),
        description: this.property.description,
        image: this.property.image,
        ownerUid: user.uid,
        createdAt: new Date()
      });

      const toast = await this.toastCtrl.create({
        message: 'Property posted successfully!',
        duration: 2000
      });
      await toast.present();

      this.router.navigate(['/listings']);

    } catch (error) {
      console.error('Error saving property:', error);

      const toast = await this.toastCtrl.create({
        message: 'Error saving property',
        duration: 2000
      });
      await toast.present();
    }
  }

  // Back button handler used by the header
  goBack() {
    this.router.navigate(['/listings']);
  }
}
