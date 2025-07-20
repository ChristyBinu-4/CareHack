import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ColorSymphony } from './color-symphony/color-symphony';
import { AlphabetSoundBubblesComponent } from './alphabet-sound-bubbles/alphabet-sound-bubbles.component';
import { EmotionMatchComponent } from './emotion-match/emotion-match.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'color-symphony',
    component: ColorSymphony
  },
  {
    path:'alphabet',
    component:AlphabetSoundBubblesComponent
  },
  {
    path:'emotion-match',
    component:EmotionMatchComponent
  }

];
