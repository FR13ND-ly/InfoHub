import { TestBed } from '@angular/core/testing';

import { DirtyArticleGuard } from './dirty-article.guard';

describe('DirtyArticleGuard', () => {
  let guard: DirtyArticleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirtyArticleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
