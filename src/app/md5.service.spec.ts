import { TestBed } from '@angular/core/testing';

import { Md5Service } from './md5.service';

describe('Md5Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Md5Service = TestBed.get(Md5Service);
    expect(service).toBeTruthy();
  });
});
