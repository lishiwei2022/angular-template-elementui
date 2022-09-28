import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCloseComponent } from './slider-close.component';

describe('SliderCloseComponent', () => {
  let component: SliderCloseComponent;
  let fixture: ComponentFixture<SliderCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
