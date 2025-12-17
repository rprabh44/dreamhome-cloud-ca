import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',  // HTML template for login page
  styleUrls: ['./login.page.scss'],  // SCSS styling for login page
  imports: [IonicModule, FormsModule, CommonModule, RouterModule] // Necessary modules
})
export class LoginPage {
  // Variables bound to form inputs using ngModel
  email: string = '';     // Stores user email
  password: string = '';  // Stores user password

  // Inject Angular Router to navigate between pages
  constructor(private router: Router) {}

  // Method called when Login button is clicked
  login() {
    // TODO: Add Firebase or other authentication logic here
    console.log('Email:', this.email, 'Password:', this.password);

    // Navigate to Home page after successful login
    this.router.navigate(['/home']);
  }

  // Method to navigate to the registration page
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Back button handler used by the header
  goBack() {
    this.router.navigate(['/home']);
  }
}
