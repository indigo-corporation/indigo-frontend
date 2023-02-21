import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForSwipersComponent } from './card-for-swipers.component';

describe('CardForSwipersComponent', () => {
  let component: CardForSwipersComponent;
  let fixture: ComponentFixture<CardForSwipersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardForSwipersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardForSwipersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
