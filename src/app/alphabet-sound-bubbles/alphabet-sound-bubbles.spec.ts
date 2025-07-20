import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetSoundBubbles } from './alphabet-sound-bubbles';

describe('AlphabetSoundBubbles', () => {
  let component: AlphabetSoundBubbles;
  let fixture: ComponentFixture<AlphabetSoundBubbles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetSoundBubbles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabetSoundBubbles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
