import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSystems2DComponent } from './root-systems2-d.component';

describe('RootSystems2DComponent', () => {
  let component: RootSystems2DComponent;
  let fixture: ComponentFixture<RootSystems2DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootSystems2DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootSystems2DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
