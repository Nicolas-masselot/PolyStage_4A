import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherStageComponent } from './rechercher-stage.component';

describe('RechercherStageComponent', () => {
  let component: RechercherStageComponent;
  let fixture: ComponentFixture<RechercherStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercherStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercherStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
