import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Concepts } from './concepts';

describe('Concepts', () => {
  let component: Concepts;
  let fixture: ComponentFixture<Concepts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Concepts],
    }).compileComponents();

    fixture = TestBed.createComponent(Concepts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
