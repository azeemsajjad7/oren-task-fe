import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
