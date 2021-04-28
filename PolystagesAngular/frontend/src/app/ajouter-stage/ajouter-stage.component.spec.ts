import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStageComponent } from './ajouter-stage.component';

describe('AjouterStageComponent', () => {
  let component: AjouterStageComponent;
  let fixture: ComponentFixture<AjouterStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
