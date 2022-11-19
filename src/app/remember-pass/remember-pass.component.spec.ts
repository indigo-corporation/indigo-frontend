import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberPassComponent } from './remember-pass.component';

describe('RememberPassComponent', () => {
  let component: RememberPassComponent;
  let fixture: ComponentFixture<RememberPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RememberPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RememberPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
