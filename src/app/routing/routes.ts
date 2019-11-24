import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SettingsComponent} from '../settings/settings.component';
import {LoginLayoutComponent} from '../layouts/login-layout/login-layout.component';
import {AppComponent} from '../app.component';
import {HomeComponent} from '../home/home.component';


export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent, // {4}
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent, // {4}
    children: [
      {
        path: 'login',
        component: LoginComponent   // {5}
      },
    ]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},

];
