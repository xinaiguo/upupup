import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private oc: OverlayContainer
  ) { }

  ngOnInit() {
    console.log(JSON.stringify(this.data));
    this.oc.getContainerElement().classList.add(this.data.dark ? 'myapp-dark-theme' : null);
  }

  onClick() {
    this.dialogRef.close('I receive your message');
  }

}
