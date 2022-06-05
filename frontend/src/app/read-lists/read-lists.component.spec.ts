import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadListsComponent } from './read-lists.component';

describe('ReadListsComponent', () => {
  let component: ReadListsComponent;
  let fixture: ComponentFixture<ReadListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
