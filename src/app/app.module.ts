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
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule, MatRippleModule,
  MatSidenavModule, MatTableModule, MatTabsModule,
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
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { SpinnerInProgressComponent } from './spinner-in-progress/spinner-in-progress.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import {HoverContainerComponent} from './hover-container/hover-container.component';

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
    HoverContainerComponent
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
  ],
  entryComponents: [LoginComponent, ModalContainerComponent],
  providers: [LoginService, ProcessHttpmsgService, {provide: 'BaseURL', useValue: baseURL}, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
