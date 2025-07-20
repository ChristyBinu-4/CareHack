import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { GameHubComponent } from './game-hub/game-hub';
import { ColorSymphony } from './color-symphony/color-symphony';
import { AlphabetSoundBubblesComponent } from './alphabet-sound-bubbles/alphabet-sound-bubbles.component';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'color-symphony',
    component: ColorSymphony
  },
  {
    path:'alphabet',
    component:AlphabetSoundBubblesComponent
  }

];
