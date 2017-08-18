import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule }     from './app-routing.module';
import { AuthGuard, IsLoggedIn } from './_guards/index';
import { AuthInterceptor, responseInterceptor } from './_interceptors/index';
import { AuthenticationService, ClientService } from './_services/index';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { DemoComponent } from './pages/demo/demo.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ClientsFormComponent } from './pages/clients/clients-form/clients-form.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    ToolbarComponent,
    SidenavComponent,
    HomeComponent,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    NewsComponent,
    DemoComponent,
    LoginComponent,
    UserFormComponent,
    ClientsFormComponent,
    ClientListComponent    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: responseInterceptor, multi: true },
    AuthGuard,
    IsLoggedIn,
    AuthenticationService,
    ClientService      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
