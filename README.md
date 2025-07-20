# InclusiveGameHub 🎮

**InclusiveGameHub** is an accessible, inclusive web application designed to help children learn through interactive mini-games focused on emotional, auditory, and phonetic development. Built with **Angular**, the app is thoughtfully designed for users with visual, hearing, movement, or cognitive impairments.

---

## Table of Contents

- [Overview](#overview)
- [Features & Use Cases](#features--use-cases)
  - [Core Features](#core-features)
  - [Use Cases](#use-cases)
- [Accessibility & Inclusivity](#accessibility--inclusivity)
  - [Accessibility Features](#accessibility-features)
- [Routing](#routing)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Start the Development Server](#start-the-development-server)
  - [Game Hub & Navigation](#game-hub--navigation)
- [Game Instructions](#game-instructions)
  - [Game 1: Sound & Color Match](#game-1-sound--color-match)
  - [Game 2: Emotion Explorer](#game-2-emotion-explorer)
  - [Game 3: Alphabet Sound Bubbles](#game-3-alphabet-sound-bubbles)
- [Dependencies](#dependencies)
- [Build & Test](#build--test)
  - [Build for Production](#build-for-production)
  - [Run Unit Tests](#run-unit-tests)
- [Contribution Guidelines](#contribution-guidelines)
- [Assets & Customization](#assets--customization)
- [License](#license)
- [Credits](#credits)

---

## Overview

**InclusiveGameHub** hosts a set of three accessibility-focused mini-games designed to support early childhood learning through sensory interaction. Users begin at a Game Hub carousel where they can navigate to the individual games: **Color Symphony**, **Emotion Explorer**, and **Bubble Alphabet**.

---

## Features & Use Cases

### Core Features

- 🎨 **Sound-to-Color Matching Game**
- 😊 **Emotion Recognition with Emojis**
- 🔤 **Alphabet Letter & Sound Learning**
- 🧠 High accessibility for neurodivergent or impaired learners
- 🖱️ Simple UI/UX with one action per screen
- 🔊 Audio + visual feedback on every interaction
- 📱 Fully responsive design

### Use Cases

- Children with **autism**, **dyslexia**, **low vision**, or **learning disabilities**
- Teachers & therapists for classroom or 1:1 sessions
- Parents supporting emotional and phonetic development
- Inclusive game-based learning environments

---

## Accessibility & Inclusivity

### Accessibility Features

- **Visual Impairment**: High-contrast visuals, voice narration, minimal clutter
- **Hearing Impairment**: Visual prompts and feedback, no dependence on audio
- **Cognitive Impairment**: Step-by-step navigation, gentle feedback, and repetition
- **Autism Inclusion**: Calm animations, no timers or stress-inducing elements
- **Keyboard Navigation**: Fully accessible without a mouse
- **Responsive Design**: Mobile and tablet friendly

---

## Routing

- `/` → Game Hub (with carousel of games)
- `/color-symphony` → Color Symphony
- `/emotion-match` → Emotion Explorer
- `/alphabet` → Bubble Alphabet

Routing is handled via `@angular/router`.
---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [Angular CLI](https://angular.io/cli)

Install Angular CLI globally (if not already installed):

```bash
  npm install -g @angular/cli
```
---

### Installation

1. **Clone the repository:**
   ```bash
     git clone <repository-url>
     cd my-accessible-app
   ```

 **Install dependencies:**
   ```bash
       git clone https://github.com/yourusername/InclusiveGameHub.git
       cd InclusiveGameHub
   ```
    ```bash
       npm install
     ```

---

## Usage

### Start the Development Server

```bash
  npm start
```
or
```bash
  ng serve
```

Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

The app will reload automatically when you modify source files.

### Game Hub & Navigation

1. You are greeted with a Game Hub, featuring a carousel showcasing all three games.
2. Click on a game card to navigate to that game’s route (/game1, /game2, /game3).
3. Use the back/home button (if implemented) to return to the hub and switch games.

---

## Game Instructions

### Game 1: Sound & Color Match
   **Goal**: Match an audio sound to a visual icon or color.
     
     Press a button to play a sound (e.g., piano sound)
     Select the icon or color that best matches the sound
     Voice feedback like: “Correct! That’s the bird!”

**Disability Inclusion**:
  
     TTS for sound names
     High-contrast icons
     Simple interaction for cognitive ease

### Game 2: Emotion Explorer
   **Goal**: Recognize and express emotions by identifying cartoon faces.
     
     Four faces shown (e.g., happy, sad, angry, excited)
     Hover/tap → TTS reads emotion aloud
     Prompt: “Which face feels excited today?”

**Disability Inclusion**:
  
     Autism-friendly layout
     Calm colors and sounds
     Voice guidance for emotion learning

### Game 3: Alphabet Sound Bubbles
   **Goal**: Playfully learn letter sounds.   
      
      Tap a floating bubble
      TTS reads: “B – Ball”
      Visual animation: Ball will be shaking
      Option to repeat sounds anytime

  **Disability Inclusion**:
  
     Great for dyslexia
     Repetitive, stress-free exploration
     Clear phonetic articulation

- **Impairment Modes**: Select from Visual, Hearing, Movement, Cognitive, or Custom.
- **High Contrast**: Toggle for better visibility.
- **Voice Feedback**: Enable/disable spoken prompts (where supported).
- **Sound Effects**: Enable/disable audio cues.
- **Keyboard Mode**: Enable for full keyboard navigation.

Settings can be changed at any time during the game.

---

## Dependencies

- [@angular/core](https://www.npmjs.com/package/@angular/core) ^20.1.0
- [@angular/common](https://www.npmjs.com/package/@angular/common) ^20.1.0
- [@angular/forms](https://www.npmjs.com/package/@angular/forms) ^20.1.0
- [@angular/platform-browser](https://www.npmjs.com/package/@angular/platform-browser) ^20.1.0
- [@angular/router](https://www.npmjs.com/package/@angular/router) ^20.1.0
- [rxjs](https://www.npmjs.com/package/rxjs) ~7.8.0
- [zone.js](https://www.npmjs.com/package/zone.js) ~0.15.0
- [tslib](https://www.npmjs.com/package/tslib) ^2.3.0

See [`package.json`](package.json) for full details.

---

## Build & Test

### Build for Production

```bash
  npm run build
```
or
```bash
  ng build
```

The build artifacts will be stored in the `dist/` directory.

### Run Unit Tests

```bash
  npm test
```
or
```bash
  ng test
```

Tests are run with [Karma](https://karma-runner.github.io).  
See [`src/app/app.spec.ts`](src/app/app.spec.ts) for example test cases.

---

## Contribution Guidelines

Contributions are welcome! To contribute:

1. Fork the repository and create a new branch.
2. Make your changes, following the existing code style.
3. Write or update tests as needed.
4. Submit a pull request with a clear description of your changes.

**Code Style:**  
- Use Angular best practices.
- Use Prettier for formatting (see [`package.json`](package.json) for configuration).
- An [.editorconfig](.editorconfig) file is included for consistent code style.
- Write clear, descriptive commit messages.

---

## Assets & Customization

- **Favicon**: The app includes a favicon at [`public/favicon.ico`](public/favicon.ico).
- **Public Assets**: Place additional static assets in the `public/` directory.
- **Styles**: Global styles are in [`src/styles.css`](src/styles.css).  
  Component-specific styles can be customized in their respective `.css` files (e.g., [`src/app/emotion-match/emotion-match.component.css`](src/app/emotion-match/emotion-match.component.css)).

---

## License

This project is licensed under the MIT License.

---

## Credits

- Emoji graphics provided by [Unicode Consortium](https://unicode.org/emoji/).
- Built with [Angular](https://angular.dev/).

---
