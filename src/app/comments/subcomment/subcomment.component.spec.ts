import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcommentComponent } from './subcomment.component';

describe('SubcommentComponent', () => {
  let component: SubcommentComponent;
  let fixture: ComponentFixture<SubcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
