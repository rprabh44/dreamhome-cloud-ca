import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Firebase Authentication
import { Router } from '@angular/router'; // Angular Router for page navigation
import { ToastController } from '@ionic/angular'; // Ionic Toast for notifications
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html', // HTML template for registration page
  styleUrls: ['./register.page.scss'], // SCSS styling for registration page
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] // Required modules
})
export class RegisterPage {
  // Variables bound to form inputs using ngModel
  fullName = '';         // Stores user's full name
  email = '';            // Stores user's email
  password = '';         // Stores user's password
  confirmPassword = '';  // Stores confirmation password

  // Inject Firebase Auth, Router, and ToastController
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  // Method triggered when the Register button is clicked
  async registerUser() {
    // Check if all fields are filled
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Please fill all fields.');
      return;
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.showToast('Passwords do not match.');
      return;
    }

    try {
      // Firebase registration using email and password
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log('Registered user:', userCredential);

      // Show success toast
      this.showToast('Registration successful!');

      // Navigate to login page after registration
      this.router.navigate(['/login']);
    } catch (error: any) {
      // Log error and show toast message
      console.error('Firebase error:', error);
      this.showToast(error.message);
    }
  }

  // Helper method to show a toast notification
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,         // Message to display
      duration: 2500,  // Duration in milliseconds
      color: 'primary' // Color of the toast
    });
    toast.present();
  }

  // Back button handler used by the header
  goBack() {
    this.router.navigate(['/home']);
  }
}
