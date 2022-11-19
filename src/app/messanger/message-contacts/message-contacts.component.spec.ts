import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContactsComponent } from './message-contacts.component';

describe('MessageContactsComponent', () => {
  let component: MessageContactsComponent;
  let fixture: ComponentFixture<MessageContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
