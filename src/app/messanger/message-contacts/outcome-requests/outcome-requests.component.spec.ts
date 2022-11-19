import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeRequestsComponent } from './outcome-requests.component';

describe('OutcomeRequestsComponent', () => {
  let component: OutcomeRequestsComponent;
  let fixture: ComponentFixture<OutcomeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutcomeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
