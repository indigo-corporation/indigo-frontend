import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactComponent } from './modalcontact.component';

describe('ModalComponent', () => {
  let component: ModalContactComponent;
  let fixture: ComponentFixture<ModalContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
