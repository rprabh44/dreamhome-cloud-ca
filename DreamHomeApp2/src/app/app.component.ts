import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AppComponent {
  userEmail: string | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.userEmail = user?.email ?? null;
    });
  }

  async logout() {
    await this.afAuth.signOut();
  }
}

