import { TestBed } from '@angular/core/testing';

import { ModifStageService } from './modif-stage.service';

describe('ModifStageService', () => {
  let service: ModifStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
