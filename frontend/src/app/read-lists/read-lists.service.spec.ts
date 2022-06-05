import { TestBed } from '@angular/core/testing';

import { ReadListsService } from './read-lists.service';

describe('ReadListsService', () => {
  let service: ReadListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
