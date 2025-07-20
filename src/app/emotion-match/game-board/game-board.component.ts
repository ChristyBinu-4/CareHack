import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
    @Input() currentRound!: number;
    @Input() totalRounds!: number;
    @Input() score!: number;
    @Input() promptText!: string;
    @Input() feedbackClass!: string;
    @Input() feedback!: string;
    @Input() dropHighlight!: boolean;
    @Input() roundEmojis!: any[];
    @Input() keyboardSelectedEmoji!: number;
    @Input() selectedEmojis!: any[];
    @Input() gameActive!: boolean;

    @Output() emojiSelected = new EventEmitter<{ emoji: any, index: number }>();
    @Output() emojiHovered = new EventEmitter<any>();
    @Output() dragStart = new EventEmitter<{ event: DragEvent, emoji: any }>();
    @Output() dragEnd = new EventEmitter<void>();
    @Output() dropAreaDrop = new EventEmitter<DragEvent>();
    @Output() dropAreaDragOver = new EventEmitter<DragEvent>();
    @Output() dropAreaDragLeave = new EventEmitter<DragEvent>();
    @Output() keyDown = new EventEmitter<KeyboardEvent>();
    @Output() openConfirmationModal = new EventEmitter<void>();
    @Output() startNewGame = new EventEmitter<Event>();
    @Output() openHelpModal = new EventEmitter<void>();
}