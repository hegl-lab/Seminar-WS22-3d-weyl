import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchRootSystemPanelComponent } from './switch-root-system-panel.component';

describe('SwitchRootSystemPanelComponent', () => {
  let component: SwitchRootSystemPanelComponent;
  let fixture: ComponentFixture<SwitchRootSystemPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchRootSystemPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchRootSystemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
