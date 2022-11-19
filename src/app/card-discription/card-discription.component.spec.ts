import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDiscriptionComponent } from './card-discription.component';

describe('CardDiscriptionComponent', () => {
  let component: CardDiscriptionComponent;
  let fixture: ComponentFixture<CardDiscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDiscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDiscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
