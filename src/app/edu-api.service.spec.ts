import { TestBed } from '@angular/core/testing';

import { EduApiService } from './edu-api.service';

describe('EduApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EduApiService = TestBed.get(EduApiService);
    expect(service).toBeTruthy();
  });
});
