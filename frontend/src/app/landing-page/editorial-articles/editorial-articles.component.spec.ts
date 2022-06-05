import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialArticlesComponent } from './editorial-articles.component';

describe('EditorialArticlesComponent', () => {
  let component: EditorialArticlesComponent;
  let fixture: ComponentFixture<EditorialArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
