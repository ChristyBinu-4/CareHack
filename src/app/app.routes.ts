import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { GameHubComponent } from './game-hub/game-hub';
import { ColorSymphony } from './color-symphony/color-symphony';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'game-hub',     
    component: GameHubComponent
  },
  {
    path: 'color-symphony',
    component: ColorSymphony
  }
];
