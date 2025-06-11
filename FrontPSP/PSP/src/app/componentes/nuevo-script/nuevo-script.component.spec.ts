import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoScriptComponent } from './nuevo-script.component';

describe('NuevoScriptComponent', () => {
  let component: NuevoScriptComponent;
  let fixture: ComponentFixture<NuevoScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoScriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
