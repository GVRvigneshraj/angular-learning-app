import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pyq } from './pyq';

describe('Pyq', () => {
  let component: Pyq;
  let fixture: ComponentFixture<Pyq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pyq],
    }).compileComponents();

    fixture = TestBed.createComponent(Pyq);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
