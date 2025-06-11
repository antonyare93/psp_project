import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaScriptsComponent } from './tabla-scripts.component';

describe('TablaScriptsComponent', () => {
  let component: TablaScriptsComponent;
  let fixture: ComponentFixture<TablaScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaScriptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
