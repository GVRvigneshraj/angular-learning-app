import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCoach } from './ai-coach';

describe('AiCoach', () => {
  let component: AiCoach;
  let fixture: ComponentFixture<AiCoach>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCoach],
    }).compileComponents();

    fixture = TestBed.createComponent(AiCoach);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
