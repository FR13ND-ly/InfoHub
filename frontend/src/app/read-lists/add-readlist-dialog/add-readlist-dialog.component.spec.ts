import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadlistDialogComponent } from './add-readlist-dialog.component';

describe('AddReadlistDialogComponent', () => {
  let component: AddReadlistDialogComponent;
  let fixture: ComponentFixture<AddReadlistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReadlistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReadlistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
