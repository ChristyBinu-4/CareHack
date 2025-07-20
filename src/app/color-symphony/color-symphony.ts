import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-symphony',
  imports: [CommonModule],
  templateUrl: './color-symphony.html',
  styleUrl: './color-symphony.scss',
  standalone:true
})
export class ColorSymphony {

  title = 'Color Symphony';
  score = 0;
  level = 1;
  sequence: number[] = [];
  playerSequence: number[] = [];
  colors = [
    { id: 1, name: 'Red', sound: 'C', color: '#e74c3c', highContrast: '#c0392b' },
    { id: 2, name: 'Blue', sound: 'D', color: '#3498db', highContrast: '#2980b9' },
    { id: 3, name: 'Green', sound: 'E', color: '#2ecc71', highContrast: '#27ae60' },
    { id: 4, name: 'Yellow', sound: 'F', color: '#f1c40f', highContrast: '#f39c12' }
  ];
  currentStep = 0;
  isPlayerTurn = false;
  soundOn = true;
  highContrast = false;
  statusMessage = 'Press Start to begin the Color Symphony!';

  toggleSound() {
    this.soundOn = !this.soundOn;
  }

  toggleContrast() {
    this.highContrast = !this.highContrast;
  }

  startGame() {
    this.sequence = [];
    this.playerSequence = [];
    this.level = 1;
    this.score = 0;
    this.addColorToSequence();
  }

  addColorToSequence() {
    this.sequence.push(Math.floor(Math.random() * 4) + 1);
    this.statusMessage = 'Watch and listen to the sequence...';
    this.playSequence();
  }

  playSequence() {
    this.isPlayerTurn = false;
    this.playerSequence = [];
    this.currentStep = 0;

    this.sequence.forEach((colorId, index) => {
      setTimeout(() => {
        this.highlightColor(colorId);
        if (index === this.sequence.length - 1) {
          setTimeout(() => {
            this.statusMessage = 'Your turn! Repeat the pattern!';
            this.isPlayerTurn = true;
          }, 600);
        }
      }, 1000 * index);
    });
  }

  highlightColor(colorId: number) {
    const audio = new Audio(`assets/sounds/${colorId}.mp3`);
    if (this.soundOn) audio.play();

    const colorBtn = document.getElementById('btn-' + colorId);
    if (colorBtn) {
      colorBtn.classList.add('active');
      setTimeout(() => {
        colorBtn.classList.remove('active');
      }, 500);
    }
  }

  onColorClick(colorId: number) {
    if (!this.isPlayerTurn) return;

    this.highlightColor(colorId);
    this.playerSequence.push(colorId);

    const correct = this.sequence[this.playerSequence.length - 1] === colorId;

    if (!correct) {
      this.statusMessage = 'Oops! Try again from the beginning.';
      this.isPlayerTurn = false;
      return;
  
    }

    if (this.playerSequence.length === this.sequence.length) {
      this.score += 10;
      this.level++;
      this.statusMessage = 'Well done! Next round!';
      setTimeout(() => this.addColorToSequence(), 1000);
    }
  
  }

  onKeyPress(event: KeyboardEvent) {
    const keyMap:any = { '1': 1, '2': 2, '3': 3, '4': 4 };
    const key = event.key;
    if (keyMap[key]) {
      this.onColorClick(keyMap[key]);
    }
  }


}
