import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SettingsComponent} from '../settings/settings.component';
import {LoginLayoutComponent} from '../layouts/login-layout/login-layout.component';
import {HomeComponent} from '../pages/home/home.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {WarehouseComponent} from '../warehouse/warehouse.component';
import {BilliardsTablesComponent} from "../pages/billiards-tables/billiards-tables.component";
import {TablesComponent} from "../pages/tables/tables.component";
import {TablesMenuComponent} from "../pages/tables-menu/tables-menu.component";
import {PaniniComponent} from "../pages/panini/panini.component";
import {AlcoliciComponent} from "../pages/alcolici/alcolici.component";

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'rooms', component: BilliardsTablesComponent},
      {path: 'tables', component: TablesComponent},
      {path: 'tables/in-door', component: HomeComponent},
      {path: 'tables/out-door', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'warehouse', component: WarehouseComponent},
      //{ path: 'home/:id', component: LoginComponent, outlet: 'modal' }
      { path: 'home/:id', component: TablesMenuComponent},
      { path: 'home/:id/panini', component: PaniniComponent},
      { path: 'home/:id/alcolici', component: AlcoliciComponent},

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
  { path: '**', redirectTo: 'rooms',pathMatch: 'full'  }
];

