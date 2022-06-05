import { TestBed } from '@angular/core/testing';

import { UpdateSearchTextService } from './update-search-text.service';

describe('UpdateSearchTextService', () => {
  let service: UpdateSearchTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSearchTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
