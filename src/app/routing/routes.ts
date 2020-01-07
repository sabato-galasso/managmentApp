import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SettingsComponent} from '../settings/settings.component';
import {LoginLayoutComponent} from '../layouts/login-layout/login-layout.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {WarehouseComponent} from '../warehouse/warehouse.component';

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'warehouse', component: WarehouseComponent},
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

