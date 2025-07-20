import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-results-screen',
    templateUrl: './results-screen.component.html',
    styleUrls: ['./results-screen.component.css']
})
export class ResultsScreenComponent implements AfterViewInit {
    @Input() score!: number;
    @Input() totalRounds!: number;
    @Input() resultSummary!: string;
    @Input() resultSuggestions!: string[];
    @Input() selectedEmojis!: any[];
    @Output() playAgain = new EventEmitter<Event>();

    @ViewChild('confettiCanvas', { static: false }) confettiCanvas!: ElementRef<HTMLCanvasElement>;

    ngAfterViewInit() {
        // Optionally, confetti animation logic can be added here if needed
    }
}