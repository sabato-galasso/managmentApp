import { Routes } from '@angular/router'
import { LoginComponent } from '../pages/login/login.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SettingsComponent } from '../settings/settings.component'
import { LoginLayoutComponent } from '../layouts/login-layout/login-layout.component'
import { HomeComponent } from '../pages/home/home.component'
import { AuthGuardService } from '../services/auth-guard.service'
import { WarehouseComponent } from '../warehouse/warehouse.component'
import { ItemLevelComponent } from '../components/levels/item-level/item-level.component'
import { SecondLevelComponent } from '../components/levels/second-level/second-level.component'
import { MenuManagerComponent } from '../pages/menu-manager/menu-manager.component'
import { MenuCategoryComponent } from '../pages/menu-category/menu-category.component'
import { MenuFirstLevelComponent } from '../pages/tables-menu/menu-first-level.component'
import { RoomsComponent } from '../pages/rooms/rooms.component'
import { InternalRoomComponent } from '../pages/internal-room/internal-room.component'
import { ExternalRoomComponent } from '../pages/external-room/external-room.component'
import { HistoryClientsComponent } from '../pages/history-clients/history-clients.component'
import { ExtCounterComponent } from '../pages/ext-counter/ext-counter.component'
import { ChartsComponent } from '../pages/charts/charts.component'

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: RoomsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'internal-room', component: InternalRoomComponent },
      { path: 'history', component: HistoryClientsComponent },
      { path: 'charts', component: ChartsComponent },
      { path: 'external-room', component: ExternalRoomComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'warehouse', component: WarehouseComponent },
      { path: 'home/:id', component: MenuFirstLevelComponent },
      { path: 'counter', component: ExtCounterComponent },
      {
        path: 'home/:id/items/category/:category',
        component: ItemLevelComponent,
      },
      { path: 'home/:id/level/:category', component: SecondLevelComponent },
      {
        path: 'home/:id/level/:category/:subCategory',
        component: ItemLevelComponent,
      },
      { path: 'menu-manager', component: MenuManagerComponent },
      { path: 'menu-category', component: MenuCategoryComponent },
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'rooms', pathMatch: 'full' },
]
