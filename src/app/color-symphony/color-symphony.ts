import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-symphony',
  imports: [CommonModule],
  templateUrl: './color-symphony.html',
  styleUrl: './color-symphony.scss',
  standalone: true
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
    this.playSound(colorId);

    const colorBtn = document.getElementById('btn-' + colorId);
    if (colorBtn) {
      colorBtn.classList.add('active');
      setTimeout(() => {
        colorBtn.classList.remove('active');
      }, 500);
    }
  }

  playSound(colorId: number | 'all') {
    if (!this.soundOn) return;
    let audio: HTMLAudioElement;
    if (colorId === 'all') {
      // Play all color sounds in sequence
      this.playAllSound();
    } else {
      audio = new Audio(`assets/sounds/${colorId}.mp3`);
      audio.onerror = () => {
        // Fallback: generate tone using Web Audio API
        const color = this.colors.find(c => c.id === colorId);
        if (color) {
          this.playTone(color.sound, 0.5);
        }
      };
      audio.play();
    }
  }

  // Play a musical note using Web Audio API
  playTone(note: string, duration: number = 0.5) {
    const noteFrequencies: { [key: string]: number } = {
      'C': 261.63,
      'D': 293.66,
      'E': 329.63,
      'F': 349.23
    };
    const freq = noteFrequencies[note];
    if (!freq) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    oscillator.connect(ctx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      ctx.close();
    }, duration * 1000);
  }

  playAllSound() {
    // Play all color sounds in sequence, one after another
    const colorIds = this.colors.map(c => c.id);
    let idx = 0;
    const playNext = () => {
      if (idx < colorIds.length) {
        const audio = new Audio(`assets/sounds/${colorIds[idx]}.mp3`);
        audio.play();
        audio.onended = () => {
          idx++;
          playNext();
        };
      }

    };
    playNext();
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
    const keyMap: any = { '1': 1, '2': 2, '3': 3, '4': 4 };
    const key = event.key;
    if (keyMap[key]) {
      this.onColorClick(keyMap[key]);
    }
  }


}
