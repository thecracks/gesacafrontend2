import { TestBed } from '@angular/core/testing';

import { NivelesService } from './niveles.service';

describe('NivelesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NivelesService = TestBed.get(NivelesService);
    expect(service).toBeTruthy();
  });
});
