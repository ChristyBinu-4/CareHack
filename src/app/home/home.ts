import {  Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home  {
  carouselItems = [
    {
      title: 'Color Symphony',
      link: '/color-symphony',
      // description: 'Give description' // optional
    },
    {
      title: 'Alphabet',
      link: '/alphabet',
      // description: 'Give description' // optional
    },
    {
      title: 'Emotion match',
      link: '/emotion-match',
      // description: 'Give description' // optional
    },

  ];

  protected readonly title = signal('Game Portal');
  
}
