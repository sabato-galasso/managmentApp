import {Routes} from '@angular/router';
import {LoginComponent} from '../pages/login/login.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SettingsComponent} from '../settings/settings.component';
import {LoginLayoutComponent} from '../layouts/login-layout/login-layout.component';
import {HomeComponent} from '../pages/home/home.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {WarehouseComponent} from '../warehouse/warehouse.component';
import {TablesMenuComponent} from "../pages/tables-menu/tables-menu.component";
import {ItemComponent} from "../components/item/item.component";
import {ItemLevelComponent} from "../components/levels/item-level/item-level.component";
import {SecondLevelComponent} from "../components/levels/second-level/second-level.component";

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'warehouse', component: WarehouseComponent},
      { path: 'home/:id', component: TablesMenuComponent},
      {path: 'home/:id/items/category/:category', component: ItemLevelComponent},
      {path: 'home/:id/level', component: SecondLevelComponent}
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

