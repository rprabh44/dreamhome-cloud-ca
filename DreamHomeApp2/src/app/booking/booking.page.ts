import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class BookingPage {
  propertyId = '';
  userUid: string | null = null;

  form = {
    name: '',
    email: '',
    dateTime: '',
    message: '',
  };

  private db;
  private auth;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    if (!getApps().length) {
      initializeApp(environment.firebase);
    }

    this.db = getFirestore();
    this.auth = getAuth();
  }

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';

    // ✅ CORRECT auth timing
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      this.userUid = user.uid;
      this.form.email = user.email || '';
    });
  }

  async submitBooking() {
    if (!this.form.name || !this.form.email || !this.form.dateTime) {
      const toast = await this.toastCtrl.create({
        message: 'Please fill all required fields',
        duration: 2000,
      });
      await toast.present();
      return;
    }

    try {
      await addDoc(collection(this.db, 'viewings'), {
        propertyId: this.propertyId,
        name: this.form.name,
        email: this.form.email,
        dateTime: this.form.dateTime,
        message: this.form.message,
        userUid: this.userUid,
        createdAt: new Date(),
      });

      const toast = await this.toastCtrl.create({
        message: 'Viewing booked successfully!',
        duration: 2000,
      });
      await toast.present();

      this.router.navigate(['/property', this.propertyId]);
    } catch (err) {
      const toast = await this.toastCtrl.create({
        message: 'Error saving booking',
        duration: 2000,
      });
      await toast.present();
    }
  }

  goBack() {
    this.router.navigate(['/listings']);
  }
}