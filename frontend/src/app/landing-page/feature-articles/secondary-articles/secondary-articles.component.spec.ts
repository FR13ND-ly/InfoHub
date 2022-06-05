import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryArticlesComponent } from './secondary-articles.component';

describe('SecondaryArticlesComponent', () => {
  let component: SecondaryArticlesComponent;
  let fixture: ComponentFixture<SecondaryArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
