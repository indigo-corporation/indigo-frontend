import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreFilmsComponent } from './more-films.component';

describe('MoreFilmsComponent', () => {
  let component: MoreFilmsComponent;
  let fixture: ComponentFixture<MoreFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreFilmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
