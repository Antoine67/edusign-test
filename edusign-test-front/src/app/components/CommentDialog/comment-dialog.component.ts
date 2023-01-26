import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CommentDialogComponent>) { }


  ngOnInit(): void {
  }

  submit(comment: string) {
    this.dialogRef.close(comment);
  }

}
