import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/login/login.component'
import { StopWatchComponent } from './stop-watch/stop-watch.component'
import { RoutingModule } from './routing/routing.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSelectModule } from '@angular/material/select'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSliderModule } from '@angular/material/slider'
import { LoginService } from './services/login.service'
import { HttpClientModule } from '@angular/common/http'
import { ProcessHttpmsgService } from './services/process-httpmsg.service'
import { baseURL } from './shared/baseUrl'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SettingsComponent } from './settings/settings.component'
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'
import { HomeComponent } from './pages/home/home.component'
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'
import { SpinnerInProgressComponent } from './components/spinner-in-progress/spinner-in-progress.component'
import { MenuItemsComponent } from './menu-items/menu-items.component'
import { HoverContainerComponent } from './hover-container/hover-container.component'
import { DataService } from './services/data.service'
import { DialogBoxComponent } from './dialog-box/dialog-box.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { WarehouseComponent } from './warehouse/warehouse.component'
import { ToastComponent } from './toast/toast.component'
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar'
import { AuthInterceptor } from './services/auth-interceptor.service'
import { InputSpinnerComponent } from './input-spinner/input-spinner.component'
import { DialogBoxSettingsComponent } from './dialog-box-settings/dialog-box-settings.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSortModule } from '@angular/material/sort'
import { MatRippleModule } from '@angular/material/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu'
import { CustomerService } from './services/customer.service'
import { ItemComponent } from './components/item/item.component'
import { WebsocketService } from './services/socket.service'
import { BillUserComponent } from './components/bill-user/bill-user.component'
import { ItemLevelComponent } from './components/levels/item-level/item-level.component'
import { SecondLevelComponent } from './components/levels/second-level/second-level.component'
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component'
import { MenuManagerServiceService } from './services/menu-manager-service.service'
import { DialogBoxCreateMenuComponent } from './modal/dialog-box-menu/dialog-box-create-menu.component'
import { MenuCategoryComponent } from './pages/menu-category/menu-category.component'
import { DialogBoxCreateCategoryComponent } from './modal/dialog-box-menu-category/dialog-box-create-category.component'
import { SlugifyPipe } from './utility/slugify.pipe'
import { FilterArrayPipe } from './utility/filterArray.pipe'
import { ItemFirstComponent } from './components/levels/item/item-first.component'
import { MessageSharingService } from './services/message-sharing.service'
import { MenuFirstLevelComponent } from './pages/tables-menu/menu-first-level.component'
import { ItemSecondLevelComponent } from './components/levels/item-second-level/item-second-level.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StopWatchComponent,
    DashboardComponent,
    SettingsComponent,
    LoginLayoutComponent,
    HomeComponent,
    SpinnerInProgressComponent,
    MenuItemsComponent,
    HoverContainerComponent,
    DialogBoxComponent,
    WarehouseComponent,
    ToastComponent,
    InputSpinnerComponent,
    DialogBoxSettingsComponent,
    MenuFirstLevelComponent,
    ItemComponent,
    BillUserComponent,
    ItemLevelComponent,
    SecondLevelComponent,
    MenuManagerComponent,
    DialogBoxCreateMenuComponent,
    MenuCategoryComponent,
    DialogBoxCreateCategoryComponent,
    FilterArrayPipe,
    ItemFirstComponent,
    ItemSecondLevelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    RoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatRippleModule,
    MatSortModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatMenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  entryComponents: [
    LoginComponent,
    DialogBoxComponent,
    DialogBoxSettingsComponent,
    DialogBoxCreateMenuComponent,
    DialogBoxCreateCategoryComponent,
  ],
  providers: [
    LoginService,
    ProcessHttpmsgService,
    { provide: AuthInterceptor, useValue: undefined },
    { provide: 'BaseURL', useValue: baseURL },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    DataService,
    CustomerService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    WebsocketService,
    MenuManagerServiceService,
    SlugifyPipe,
    FilterArrayPipe,
    MessageSharingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
