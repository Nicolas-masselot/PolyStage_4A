import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEntrepriseDialogComponent } from './ajout-entreprise-dialog.component';

describe('AjoutEntrepriseDialogComponent', () => {
  let component: AjoutEntrepriseDialogComponent;
  let fixture: ComponentFixture<AjoutEntrepriseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutEntrepriseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEntrepriseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
