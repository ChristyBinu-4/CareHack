import { Component } from '@angular/core';
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
export class Home {
  carouselItems = [
    {
      title: 'Color Symphony',
      link: '/color-symphony',
      img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
      // description: 'Give description' // optional
    },
    {
      title: 'Bubble Alphabet',
      link: '/alphabet',
      img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80'
      // description: 'Give description' // optional
    },
    {
      title: 'Emotion Explorer',
      link: '/emotion-match',
      img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
      // description: 'Give description' // optional
    },

  ];

  protected readonly title = signal('Game Portal');

}
