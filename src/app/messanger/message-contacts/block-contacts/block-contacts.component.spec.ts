import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockContactsComponent } from './block-contacts.component';

describe('BlockContactsComponent', () => {
  let component: BlockContactsComponent;
  let fixture: ComponentFixture<BlockContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
