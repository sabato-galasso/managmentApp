import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StopWatchComponent } from './stop-watch/stop-watch.component';
import {RoutingModule} from './routing/routing.module';
import 'hammerjs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule, MatPaginatorModule, MatRippleModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {LoginService} from './services/login.service';
import {HttpClientModule} from '@angular/common/http';
import {ProcessHttpmsgService} from './services/process-httpmsg.service';
import {baseURL} from './shared/baseUrl';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeComponent } from './home/home.component';
import {JwtHelperService, JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { SpinnerInProgressComponent } from './spinner-in-progress/spinner-in-progress.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import {HoverContainerComponent} from './hover-container/hover-container.component';
import {DataService} from './services/data.service';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ToastComponent } from './toast/toast.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthInterceptor} from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StopWatchComponent,
    DashboardComponent,
    HeaderComponent,
    SettingsComponent,
    LoginLayoutComponent,
    HomeComponent,
    ModalContainerComponent,
    SpinnerInProgressComponent,
    MenuItemsComponent,
    HoverContainerComponent,
    DialogBoxComponent,
    WarehouseComponent,
    ToastComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter: funcTokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    MatPaginatorModule
  ],
  entryComponents: [LoginComponent, ModalContainerComponent, DialogBoxComponent],
  providers: [LoginService,
    ProcessHttpmsgService,
    {provide: AuthInterceptor},
    {provide: 'BaseURL', useValue: baseURL},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    DataService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function funcTokenGetter() { return localStorage.getItem('access_token'); }

