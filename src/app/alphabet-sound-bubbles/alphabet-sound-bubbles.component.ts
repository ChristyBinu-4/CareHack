import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-alphabet-sound-bubbles',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './alphabet-sound-bubbles.component.html',
  styleUrls: ['./alphabet-sound-bubbles.component.css']
})
export class AlphabetSoundBubblesComponent {
  letters = [
    { letter: 'A', word: 'Apple', image: '🍎', description: 'A red fruit that is sweet and crunchy.' },
    { letter: 'B', word: 'Ball', image: '⚽', description: 'A round object used for playing games like football.' },
    { letter: 'C', word: 'Cat', image: '🐱', description: 'A small pet animal with whiskers and a tail.' },
    { letter: 'D', word: 'Dog', image: '🐶', description: 'A loyal animal often kept as a pet.' },
    { letter: 'E', word: 'Elephant', image: '🐘', description: 'A large animal with a trunk and big ears.' },
    { letter: 'F', word: 'Fish', image: '🐟', description: 'An animal that lives in water and swims using fins.' },
    { letter: 'G', word: 'Grapes', image: '🍇', description: 'Small round fruits that grow in bunches and are sweet.' },
    { letter: 'H', word: 'Hat', image: '🎩', description: 'Something you wear on your head to protect from sun or cold.' },
    { letter: 'I', word: 'Ice cream', image: '🍦', description: 'A cold and sweet dessert loved by children.' },
    { letter: 'J', word: 'Juice', image: '🧃', description: 'A tasty drink made from fruits like oranges or apples.' },
    { letter: 'K', word: 'Kite', image: '🪁', description: 'A light frame with cloth flown in the wind using a string.' },
    { letter: 'L', word: 'Lion', image: '🦁', description: 'A big wild cat known as the king of the jungle.' },
    { letter: 'M', word: 'Monkey', image: '🐵', description: 'A playful animal that climbs trees and eats bananas.' },
    { letter: 'N', word: 'Nest', image: '🪺', description: 'A home made by birds using twigs to lay eggs.' },
    { letter: 'O', word: 'Orange', image: '🍊', description: 'A round fruit that is orange in color and juicy inside.' },
    { letter: 'P', word: 'Pencil', image: '✏️', description: 'A tool used for writing or drawing, often with an eraser.' },
    { letter: 'Q', word: 'Queen', image: '👑', description: 'A royal lady who rules a kingdom with a crown.' },
    { letter: 'R', word: 'Rabbit', image: '🐰', description: 'A small animal with long ears that hops around.' },
    { letter: 'S', word: 'Sun', image: '☀️', description: 'The bright star in the sky that gives light and heat.' },
    { letter: 'T', word: 'Tiger', image: '🐯', description: 'A strong and fast animal with orange and black stripes.' },
    { letter: 'U', word: 'Umbrella', image: '☂️', description: 'A thing used to stay dry in the rain or cool in the sun.' },
    { letter: 'V', word: 'Violin', image: '🎻', description: 'A musical instrument played with a bow and strings.' },
    { letter: 'W', word: 'Watch', image: '⌚', description: 'A device worn on the wrist to tell time.' },
    { letter: 'X', word: 'Xylophone', image: '🎼', description: 'A musical instrument with metal or wooden bars played with sticks.' },
    { letter: 'Y', word: 'Yoyo', image: '🪀', description: 'A toy that goes up and down on a string.' },
    { letter: 'Z', word: 'Zebra', image: '🦓', description: 'An animal with black and white stripes that looks like a horse.' }
  ];
mode: 'visual' | 'hearing' | 'normal' = 'normal';
  activeItem: any = null;
onBubbleClick(letterObj: any) {
  this.activeItem = (this.mode === 'hearing' || this.mode === 'normal') ? letterObj : null;
  if (this.mode === 'visual' || this.mode === 'normal') {
    this.speak(`${letterObj.letter} for ${letterObj.word}`);

    setTimeout(() => {
      this.spellWord(letterObj.word);
    }, 400);

    const spellingDelay = letterObj.word.length * 600;
    setTimeout(() => {
      if (letterObj.description) {
        this.speak(letterObj.description);
      }
    }, 1000 + spellingDelay);
  }

  if (this.mode !== 'visual') {
    setTimeout(() => {
      this.activeItem = null;
    }, 20000); 
  }
}

  speak(text: string) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }

  spellWord(word: string) {
    const synth = window.speechSynthesis;
    let delay = 0;
    for (const char of word.toUpperCase()) {
      const utterance = new SpeechSynthesisUtterance(char);
      utterance.rate = 0.8;
      utterance.volume = 1;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      synth.speak(utterance);
      delay += 500;
    }
  }
}
