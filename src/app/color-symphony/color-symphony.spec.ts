import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSymphony } from './color-symphony';

describe('ColorSymphony', () => {
  let component: ColorSymphony;
  let fixture: ComponentFixture<ColorSymphony>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSymphony]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorSymphony);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
