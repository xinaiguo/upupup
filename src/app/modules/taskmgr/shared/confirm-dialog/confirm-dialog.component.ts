import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 mat-dialog-title>{{title}}</h3>
    <div mat-dialog-content>
      {{content}}
    </div>
    <div mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="onClick(true)">Confirm</button>
      <button type="button" mat-dialog-close mat-button (click)="onClick(false)" >Cancel</button>
    </div>

  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
  title = '';
  content = '';

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onClick(result: Boolean) {
    this.dialogRef.close(result);
  }

}
