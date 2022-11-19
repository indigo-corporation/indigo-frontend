import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchTogetherComponent } from './watch-together.component';

describe('WatchTogetherComponent', () => {
  let component: WatchTogetherComponent;
  let fixture: ComponentFixture<WatchTogetherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchTogetherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchTogetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
