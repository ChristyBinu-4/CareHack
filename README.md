# MyAngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
npm start
```
or
```bash
ng serve --host 0.0.0.0
```

Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

The app will reload automatically when you modify source files.

### Playing the Game

1. Click **Start Game** on the welcome screen.
2. For each round, match the correct emoji to the prompted emotion.
3. Use mouse, keyboard, or assistive technologies as needed.
4. At the end, review your score and suggestions.
5. Play again or adjust accessibility settings as desired.

---

## Configuration Options

### Accessibility Panel

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
