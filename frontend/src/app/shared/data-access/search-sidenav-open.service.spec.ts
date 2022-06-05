import { TestBed } from '@angular/core/testing';

import { SearchSidenavOpenService } from './search-sidenav-open.service';

describe('SearchSidenavOpenService', () => {
  let service: SearchSidenavOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchSidenavOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
