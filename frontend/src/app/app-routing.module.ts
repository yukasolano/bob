import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './core/auth/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { EditBookComponent } from './edit-book/edit-book.component';



const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'book/:id', component: EditBookComponent, canActivate: [AuthGuard] },
  { path: 'book', component: EditBookComponent, canActivate: [AuthGuard] },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
