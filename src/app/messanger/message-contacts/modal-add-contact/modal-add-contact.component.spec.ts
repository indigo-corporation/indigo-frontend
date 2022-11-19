import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddContactComponent } from './modal-add-contact.component';

describe('ModalAddContactComponent', () => {
  let component: ModalAddContactComponent;
  let fixture: ComponentFixture<ModalAddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
