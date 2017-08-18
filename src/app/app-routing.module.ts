import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { DemoComponent } from './pages/demo/demo.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ClientsFormComponent } from './pages/clients/clients-form/clients-form.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';

import { AuthGuard } from './_guards/auth.guard';
import { IsLoggedIn } from './_guards/is-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'login',
    component: LoginComponent,
    resolve: [IsLoggedIn]
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',  component: HomeComponent },
      { path: 'user',  component: UserFormComponent },      
      { path: 'clients',  component: ClientListComponent, pathMatch: 'full' },
      { path: 'clients/new',  component: ClientsFormComponent },
      { path: 'clients/:id',  component: ClientsFormComponent },
      { path: 'news',  component: NewsComponent },      
      { path: 'demo',  component: DemoComponent },
    ]
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}