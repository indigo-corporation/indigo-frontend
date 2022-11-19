import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeRequestsComponent } from './income-requests.component';

describe('IncomeRequestsComponent', () => {
  let component: IncomeRequestsComponent;
  let fixture: ComponentFixture<IncomeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
