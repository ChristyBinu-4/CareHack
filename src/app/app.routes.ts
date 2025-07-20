import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard'; // Assuming you have a DashboardComponent
import { StudentProfile } from './student-profile/student-profile';
import { GameHubComponent } from './game-hub/game-hub';
import { ColorSymphony } from './color-symphony/color-symphony';

export const routes: Routes = [
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
    component:ColorSymphony
  }
];