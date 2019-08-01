import { TestBed } from '@angular/core/testing';

import { AniosService } from './anios.service';

describe('AniosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AniosService = TestBed.get(AniosService);
    expect(service).toBeTruthy();
  });
});
