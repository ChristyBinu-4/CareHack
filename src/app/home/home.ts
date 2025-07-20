import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone:true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


    protected readonly title = signal('Game Portal');
    manualScroll(direction: number): void {
      const carousel = document.querySelector('.carousel') as HTMLElement;
      const currentScroll = carousel.scrollLeft;
      const scrollAmount = 300 * direction; // Matches your item width
      
      carousel.style.animation = 'none';
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Restart animation after manual scroll
      setTimeout(() => {
        carousel.style.animation = 'scroll 20s linear infinite';
      }, 1000);
    }
}
