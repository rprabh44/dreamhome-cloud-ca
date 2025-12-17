import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Standalone pages
import { HomePage } from './home/home.page';
import { ListingsPage } from './listings/listings.page';
import { PropertyPage } from './property/property.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomePage },
  { path: 'listings', component: ListingsPage },
  { path: 'property/:id', component: PropertyPage },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'booking/:id',
    loadComponent: () =>
      import('./booking/booking.page').then(m => m.BookingPage)
  },
  {
    path: 'create-property',
    loadComponent: () =>
      import('./create-property/create-property.page')
        .then(m => m.CreatePropertyPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
