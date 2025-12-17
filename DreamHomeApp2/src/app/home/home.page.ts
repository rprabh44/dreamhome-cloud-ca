import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',                // Selector used for referencing this component
  templateUrl: './home.page.html',      // HTML template file for this page
  styleUrls: ['./home.page.scss'],      // SCSS styling file for this page
  standalone: true,                     // Standalone component (no NgModule needed)
  imports: [IonicModule, CommonModule, RouterModule], // Imported modules required
})
export class HomePage {
  constructor(private router: Router) {} // Router service injected to handle page navigation

  // Navigate to Listings page when "View Listings" button is clicked
  goToListings() {
    this.router.navigate(['/listings']);
  }

  // Navigate to Login page when "Login" button in the header is clicked
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Navigate to Register page when "Register" button in the header is clicked
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Navigate to Create Property page when "Create Property" CTA button is clicked
  goToCreateProperty() {
    this.router.navigate(['/create-property']);
  }

  // Navigate to Booking page when "Book Now" CTA button is clicked
  goToBooking() {
    this.router.navigate(['/listing']);
  };

 
}