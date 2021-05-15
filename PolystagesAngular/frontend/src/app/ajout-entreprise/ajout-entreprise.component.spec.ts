import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEntrepriseComponent } from './ajout-entreprise.component';

describe('AjoutEntrepriseComponent', () => {
  let component: AjoutEntrepriseComponent;
  let fixture: ComponentFixture<AjoutEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
