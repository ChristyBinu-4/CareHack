import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



interface Emotion {
    emoji: string;
    name: string;
    alt: string;
}

interface SelectedEmoji {
    round: number;
    emoji: string;
    name: string;
    correct: boolean;
}

@Component({
    selector: 'app-emotion-match',
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './emotion-match.component.html',
    styleUrls: ['./emotion-match.component.css']
})
export class EmotionMatchComponent implements OnInit {
    // Results summary and suggestions
    resultSummary: string = '';
    resultSuggestions: string[] = [];
    // Confetti
    @ViewChild('confettiCanvas', { static: false }) confettiCanvasRef!: ElementRef<HTMLCanvasElement>;
    confettiActive = false;
    confettiParticles: any[] = [];
    confettiAnimationFrame: number | null = null;
    emotions: Emotion[] = [
        { emoji: "😊", name: "happy", alt: "smiling face" },
        { emoji: "😢", name: "sad", alt: "crying face" },
        { emoji: "😡", name: "angry", alt: "angry face" },
        { emoji: "😨", name: "scared", alt: "fearful face" },
        { emoji: "😲", name: "surprised", alt: "surprised face" },
        { emoji: "😴", name: "sleepy", alt: "sleeping face" },
        { emoji: "😋", name: "silly", alt: "face savoring food" },
        { emoji: "😍", name: "loving", alt: "smiling face with heart-eyes" },
        { emoji: "😎", name: "cool", alt: "smiling face with sunglasses" },
        { emoji: "🤔", name: "thinking", alt: "thinking face" }
    ];

    currentRound = 1;
    totalRounds = 10;
    score = 0;
    selectedEmojis: SelectedEmoji[] = [];
    correctAnswers: Emotion[] = [];
    keyboardSelectedEmoji = -1;
    keyboardMode = false;
    gameActive = false;
    resultsVisible = false;
    isDragging = false;
    dropHighlight = false;
    draggedEmoji: Emotion | null = null;
    lastSpokenEmoji: string | null = null;

    // UI State
    promptText = 'Click "New Game" to start!';
    feedback = '';
    feedbackClass = 'feedback';

    // Impairment selection
    impairmentOptions = [
        { label: 'Visual', value: 'visual' },
        { label: 'Hearing', value: 'hearing' },
        { label: 'Movement', value: 'movement' },
        { label: 'Cognitive', value: 'cognitive' },
        { label: 'Custom', value: 'custom' }
    ];
    selectedImpairment: string = 'custom';

    onImpairmentChange(value: string) {
        this.selectedImpairment = value;
        switch (value) {
            case 'visual':
                this.highContrast = true;
                this.voiceFeedback = true;
                this.soundEffects = false;
                this.keyboardMode = false;
                break;
            case 'hearing':
                this.highContrast = false;
                this.voiceFeedback = false;
                this.soundEffects = true;
                this.keyboardMode = false;
                break;
            case 'movement':
                this.highContrast = false;
                this.voiceFeedback = false;
                this.soundEffects = true;
                this.keyboardMode = true;
                break;
            case 'cognitive':
                this.highContrast = true;
                this.voiceFeedback = true;
                this.soundEffects = true;
                this.keyboardMode = false;
                break;
            case 'custom':
            default:
                // Do not auto-change toggles, user can set manually
                break;
        }
        this.saveSettings();
    }
    roundEmojis: Emotion[] = [];
    targetEmotion: Emotion | null = null;

    // Accessibility settings
    highContrast = false;
    soundEffects = true;
    voiceFeedback = true;

    // Modal states
    showHelpModal = false;
    showConfirmationModal = false;

    // Results
    showResultsScreen = false;

    // Accessibility panel state
    panelExpanded = true;

    // Audio
    audio: { [key: string]: HTMLAudioElement } = {
        correct: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'),
        incorrect: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'),
        select: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...')
    };

    synth = window.speechSynthesis;
    voice: SpeechSynthesisVoice | null = null;

    @ViewChild('gameBoard', { static: false }) gameBoardRef!: ElementRef;

    ngOnInit() {
        this.loadSettings();
        this.initSpeech();
        this.showHomeState();
    }

    showHomeState() {
        this.gameActive = false;
        this.showResultsScreen = false;
        this.promptText = 'Click "New Game" to start!';
        this.feedback = '';
        this.feedbackClass = 'feedback';
        this.roundEmojis = [];
        this.targetEmotion = null;
        this.selectedEmojis = [];
        this.correctAnswers = [];
        this.currentRound = 1;
        this.score = 0;
    }

    loadSettings() {
        this.highContrast = localStorage.getItem('highContrast') === 'true';
        this.soundEffects = localStorage.getItem('soundEffects') !== 'false';
        this.voiceFeedback = localStorage.getItem('voiceFeedback') !== 'false';
        this.keyboardMode = localStorage.getItem('keyboardMode') === 'true';
        this.selectedImpairment = localStorage.getItem('selectedImpairment') || 'custom';
        if (this.highContrast) document.body.classList.add('high-contrast');
        else document.body.classList.remove('high-contrast');
    }

    saveSettings() {
        localStorage.setItem('highContrast', String(this.highContrast));
        localStorage.setItem('soundEffects', String(this.soundEffects));
        localStorage.setItem('voiceFeedback', String(this.voiceFeedback));
        localStorage.setItem('keyboardMode', String(this.keyboardMode));
        localStorage.setItem('selectedImpairment', this.selectedImpairment);
        if (this.highContrast) document.body.classList.add('high-contrast');
        else document.body.classList.remove('high-contrast');
    }

    initSpeech() {
        this.synth.onvoiceschanged = () => {
            const voices = this.synth.getVoices();
            this.voice = voices.find(v => v.name.includes('Child') || v.name.includes('Kids')) ||
                voices.find(v => v.lang.includes('en')) ||
                voices[0];
        };
        // Trigger voiceschanged in some browsers
        this.synth.getVoices();
    }

    speak(text: string) {
        if (!this.voiceFeedback || !this.synth || !this.gameActive) return;
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) utterance.voice = this.voice;
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        this.synth.speak(utterance);
    }

    playSound(type: string) {
        if (!this.soundEffects) return;
        const sound = this.audio[type].cloneNode() as HTMLAudioElement;
        sound.play().catch(() => { });
    }

    startNewGame(event?: Event) {
        if (event) this.triggerRipple(event);
        this.currentRound = 1;
        this.score = 0;
        this.selectedEmojis = [];
        this.correctAnswers = [];
        this.gameActive = true;
        this.resultsVisible = false;
        this.lastSpokenEmoji = null;
        this.showResultsScreen = false;
        this.clearConfetti();
        this.setupRound();
    }

    setupRound() {
        this.roundEmojis = [];
        this.feedback = '';
        this.feedbackClass = 'feedback';
        this.keyboardSelectedEmoji = -1;
        this.lastSpokenEmoji = null;
        this.dropHighlight = false;
        this.isDragging = false;
        this.draggedEmoji = null;

        // Select 3-4 random emojis (including the target)
        const numEmojis = Math.floor(Math.random() * 2) + 3; // 3 or 4
        const shuffledEmojis = [...this.emotions].sort(() => 0.5 - Math.random());
        this.roundEmojis = shuffledEmojis.slice(0, numEmojis);

        // Select target emotion
        this.targetEmotion = this.roundEmojis[Math.floor(Math.random() * this.roundEmojis.length)];

        // Display prompt
        this.promptText = `Find the ${this.targetEmotion.name} face`;
        this.speak(`Round ${this.currentRound}. Find the ${this.targetEmotion.name} face.`);

        // Focus for keyboard users
        setTimeout(() => {
            if (this.gameBoardRef) {
                this.gameBoardRef.nativeElement.focus();
            }
        }, 0);
    }

    handleEmojiSelection(emoji: Emotion, index: number) {
        if (!this.gameActive) return;
        this.playSound('select');
        const isCorrect = emoji.name === this.targetEmotion?.name;
        this.selectedEmojis.push({
            round: this.currentRound,
            emoji: emoji.emoji,
            name: emoji.name,
            correct: isCorrect
        });

        // Haptic feedback for tactile response
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            if (isCorrect) {
                navigator.vibrate?.([30, 20, 30]); // double short buzz for correct
            } else {
                navigator.vibrate?.(80); // single longer buzz for incorrect
            }
        }

        if (isCorrect) {
            this.feedback = 'Correct! Well done!';
            this.feedbackClass = 'feedback correct';
            this.score++;
            this.correctAnswers.push(emoji);
            this.playSound('correct');
            this.speak('Correct! Well done!');
            setTimeout(() => {
                if (this.currentRound < this.totalRounds) {
                    this.currentRound++;
                    this.setupRound();
                } else {
                    this.endGame();
                }
            }, 1500);
        } else {
            this.feedback = 'Not quite. Try again!';
            this.feedbackClass = 'feedback incorrect';
            this.playSound('incorrect');
            this.speak('Not quite. Try again!');
        }
    }

    handleEmojiHover(emoji: Emotion) {
        if (this.voiceFeedback && this.lastSpokenEmoji !== emoji.emoji) {
            this.speak(emoji.alt);
            this.playSound('select');
            this.lastSpokenEmoji = emoji.emoji;
        }
    }

    // Drag and drop
    onDragStart(event: DragEvent, emoji: Emotion) {
        if (!this.keyboardMode) {
            this.isDragging = true;
            this.draggedEmoji = emoji;
            if (event && event.dataTransfer) {
                event.dataTransfer.setData('text/plain', emoji.name);
                event.dataTransfer.effectAllowed = 'move';
            }
        }
    }

    // Robust drop handler: use dataTransfer to get emoji
    onDropAreaDrop(event: DragEvent) {
        event.preventDefault();
        let droppedEmoji: Emotion | undefined;

        // Try to get emoji from dataTransfer
        if (event.dataTransfer) {
            const emojiName = event.dataTransfer.getData('text/plain');
            if (emojiName) {
                droppedEmoji = this.roundEmojis.find(e => e.name === emojiName);
            }
        }
        // Fallback: use draggedEmoji if dataTransfer is empty (for some browsers)
        if (!droppedEmoji && this.draggedEmoji) {
            droppedEmoji = this.roundEmojis.find(e => e.name === this.draggedEmoji?.name);
        }

        if (!this.keyboardMode && droppedEmoji) {
            this.handleEmojiSelection(droppedEmoji, -1);
        }
        this.isDragging = false;
        this.draggedEmoji = null;
        this.dropHighlight = false;
    }

    onDragEnd() {
        this.isDragging = false;
        this.draggedEmoji = null;
        this.dropHighlight = false;
    }

    onDropAreaDragOver(event: DragEvent) {
        event.preventDefault();
        if (!this.keyboardMode && this.isDragging) {
            this.dropHighlight = true;
        }
    }

    // (removed duplicate onDropAreaDrop)

    onDropAreaDragLeave(event: DragEvent) {
        event.preventDefault();
        this.dropHighlight = false;
    }

    // Keyboard navigation
    onKeyDown(event: KeyboardEvent) {
        if (!this.keyboardMode || !this.gameActive) return;
        const len = this.roundEmojis.length;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                this.keyboardSelectedEmoji = (this.keyboardSelectedEmoji - 1 + len) % len;
                this.updateKeyboardSelection();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                this.keyboardSelectedEmoji = (this.keyboardSelectedEmoji + 1) % len;
                this.updateKeyboardSelection();
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (this.keyboardSelectedEmoji >= 0) {
                    this.handleEmojiSelection(this.roundEmojis[this.keyboardSelectedEmoji], this.keyboardSelectedEmoji);
                }
                break;
            case 'Escape':
                event.preventDefault();
                this.keyboardSelectedEmoji = -1;
                break;
        }
    }

    updateKeyboardSelection() {
        if (this.keyboardSelectedEmoji >= 0 && this.roundEmojis[this.keyboardSelectedEmoji]) {
            this.speak(this.roundEmojis[this.keyboardSelectedEmoji].alt);
        }
    }

    // Accessibility panel
    togglePanel() {
        this.panelExpanded = !this.panelExpanded;
    }

    // Settings toggles
    toggleHighContrast(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.highContrast = checked;
        if (this.selectedImpairment !== 'custom') {
            this.selectedImpairment = 'custom';
        }
        this.saveSettings();
        // Always update body class for accessibility
        if (this.highContrast) document.body.classList.add('high-contrast');
        else document.body.classList.remove('high-contrast');
        this.speak(`High contrast mode ${this.highContrast ? 'enabled' : 'disabled'}`);
    }

    toggleSoundEffects(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.soundEffects = checked;
        if (this.selectedImpairment !== 'custom') {
            this.selectedImpairment = 'custom';
        }
        this.saveSettings();
        this.speak(`Sound effects ${this.soundEffects ? 'enabled' : 'disabled'}`);
    }

    toggleVoiceFeedback(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.voiceFeedback = checked;
        if (this.selectedImpairment !== 'custom') {
            this.selectedImpairment = 'custom';
        }
        this.saveSettings();
        this.speak(`Voice feedback ${this.voiceFeedback ? 'enabled' : 'disabled'}`);
    }

    toggleKeyboardMode(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.keyboardMode = checked;
        this.saveSettings();
        this.speak(`Keyboard mode ${this.keyboardMode ? 'enabled' : 'disabled'}`);
        if (this.keyboardMode) {
            this.keyboardSelectedEmoji = 0;
            this.updateKeyboardSelection();
            setTimeout(() => {
                if (this.gameBoardRef) {
                    this.gameBoardRef.nativeElement.focus();
                }
            }, 0);
        } else {
            this.keyboardSelectedEmoji = -1;
        }
    }

    // Modal controls
    // (removed duplicate openHelpModal/closeHelpModal)

    openConfirmationModal() {
        this.showConfirmationModal = true;
        setTimeout(() => {
            const modal = document.querySelector('.confirmation-modal .confirmation-content') as HTMLElement;
            if (modal) modal.focus();
        }, 0);
        this.speak('Are you sure you want to quit the current game?');
    }

    onConfirmationModalBackgroundClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('confirmation-modal')) {
            this.showConfirmationModal = false;
            this.speak('Continue playing.');
        }
    }

    confirmQuit(event?: Event) {
        if (event) this.triggerRipple(event);
        this.showConfirmationModal = false;
        this.showHomeState();
        this.speak('Game quit. Ready to start a new game.');
    }

    cancelQuit(event?: Event) {
        if (event) this.triggerRipple(event);
        this.showConfirmationModal = false;
        this.speak('Continue playing.');
    }

    openHelpModal() {
        this.showHelpModal = true;
        setTimeout(() => {
            const modal = document.querySelector('.help-modal .modal-content') as HTMLElement;
            if (modal) modal.focus();
        }, 0);
        this.speak('Help menu opened. Use tab to navigate options.');
    }

    closeHelpModal(event?: MouseEvent) {
        if (!event || (event.target as HTMLElement).classList.contains('help-modal') || (event.target as HTMLElement).classList.contains('close-modal')) {
            this.showHelpModal = false;
        }
    }

    // End game
    endGame() {
        this.gameActive = false;
        this.showResultsScreen = true;
        this.computeResultSummaryAndSuggestions();
        this.speak(`Game complete. Your score is ${this.score} out of ${this.totalRounds}.`);
        setTimeout(() => this.launchConfetti(), 400);
    }

    // Compute summary and suggestions for results screen
    computeResultSummaryAndSuggestions() {
        const total = this.selectedEmojis.length;
        const correct = this.selectedEmojis.filter(e => e.correct).length;
        this.resultSummary = `You recognized ${correct} out of ${total} emotions correctly.`;

        // Count incorrect answers by emotion name
        const missed: { [name: string]: number } = {};
        for (const sel of this.selectedEmojis) {
            if (!sel.correct) {
                missed[sel.name] = (missed[sel.name] || 0) + 1;
            }
        }
        const missedEmotions = Object.keys(missed);
        if (missedEmotions.length === 0) {
            this.resultSuggestions = ["Excellent! You recognized all emotions correctly. Try a new game for more practice."];
        } else {
            // Sort by most missed
            missedEmotions.sort((a, b) => missed[b] - missed[a]);
            this.resultSuggestions = [
                `Consider practicing these emotions: ${missedEmotions.map(name => {
                    const emoji = this.emotions.find(e => e.name === name)?.emoji || '';
                    return `${emoji} (${name})`;
                }).join(', ')}.`,
                "Review the differences between these emotions and try again!"
            ];
        }
    }

    playAgain(event?: Event) {
        if (event) this.triggerRipple(event);
        this.startNewGame();
    }
    // --- Confetti Animation ---
    launchConfetti() {
        if (!this.confettiCanvasRef) return;
        const canvas = this.confettiCanvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const colors = ['#ff9f1c', '#4a6fa5', '#2ecc71', '#e74c3c', '#ffe5ec', '#f8fafc'];
        const w = canvas.width, h = canvas.height;
        this.confettiParticles = [];
        for (let i = 0; i < 80; i++) {
            this.confettiParticles.push({
                x: Math.random() * w,
                y: Math.random() * -h,
                r: Math.random() * 8 + 6,
                d: Math.random() * 80 + 40,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 10,
                tiltAngle: 0,
                tiltAngleIncremental: (Math.random() * 0.07) + 0.05
            });
        }
        this.confettiActive = true;
        this.animateConfetti();
    }

    animateConfetti() {
        if (!this.confettiActive || !this.confettiCanvasRef) return;
        const canvas = this.confettiCanvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of this.confettiParticles) {
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.r, p.r * 0.6, p.tilt, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.85;
            ctx.fill();
        }
        this.updateConfetti();
        this.confettiAnimationFrame = requestAnimationFrame(() => this.animateConfetti());
    }

    updateConfetti() {
        const canvas = this.confettiCanvasRef.nativeElement;
        const w = canvas.width, h = canvas.height;
        for (let p of this.confettiParticles) {
            p.y += (Math.cos(p.d) + 3 + p.r / 2) * 0.7;
            p.x += Math.sin(0.01 * p.d);
            p.tiltAngle += p.tiltAngleIncremental;
            p.tilt = Math.sin(p.tiltAngle) * 12;
            if (p.y > h + 20) {
                p.x = Math.random() * w;
                p.y = -10;
            }
        }
    }

    clearConfetti() {
        this.confettiActive = false;
        if (this.confettiAnimationFrame) {
            cancelAnimationFrame(this.confettiAnimationFrame);
            this.confettiAnimationFrame = null;
        }
        if (this.confettiCanvasRef) {
            const canvas = this.confettiCanvasRef.nativeElement;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    // --- Button Ripple Effect ---
    triggerRipple(event: Event) {
        const button = (event.currentTarget as HTMLElement);
        if (!button) return;
        const ripple = button.querySelector('.ripple') as HTMLElement;
        if (!ripple) return;
        ripple.classList.remove('show');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        const x = (event as MouseEvent).clientX - rect.left - size / 2;
        const y = (event as MouseEvent).clientY - rect.top - size / 2;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('show');
        setTimeout(() => ripple.classList.remove('show'), 500);
    }
}