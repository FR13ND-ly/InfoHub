import { TestBed } from '@angular/core/testing';

import { UserSidenavOpenService } from './user-sidenav-open.service';

describe('UserSidenavOpenService', () => {
  let service: UserSidenavOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSidenavOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
