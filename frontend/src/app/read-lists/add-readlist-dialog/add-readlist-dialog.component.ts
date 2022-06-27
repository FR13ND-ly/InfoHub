import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/data-access/user.service';
import { ReadListsService } from '../read-lists.service';

@Component({
  selector: 'app-add-readlist-dialog',
  templateUrl: './add-readlist-dialog.component.html',
  styleUrls: ['./add-readlist-dialog.component.scss']
})
export class AddReadlistDialogComponent implements OnInit {

  constructor(private readListsService : ReadListsService, private userService : UserService, private dialogRef: MatDialogRef<AddReadlistDialogComponent>) { }
  user! : any
  ngOnInit(): void {
    this.userService.getUserUpdateListener()
    .subscribe((user) => this.user = user)
  }

  onAddList(form: NgForm) {
    if (form.invalid) return
    this.readListsService
      .addReadList({
        name: form.value.name,
        access: form.value.access,
        user: this.user.uid,
      })
    .subscribe(() => this.dialogRef.close());
  }

}
