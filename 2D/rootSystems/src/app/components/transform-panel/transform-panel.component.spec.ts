import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformPanelComponent } from './transform-panel.component';

describe('TransformPanelComponent', () => {
  let component: TransformPanelComponent;
  let fixture: ComponentFixture<TransformPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
