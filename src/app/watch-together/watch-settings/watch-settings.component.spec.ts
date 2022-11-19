import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchSettingsComponent } from './watch-settings.component';

describe('WatchSettingsComponent', () => {
  let component: WatchSettingsComponent;
  let fixture: ComponentFixture<WatchSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
