import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {
  title = '';
  priorities = [
    {
      label: 'Emergency',
      value: 1
    },
    {
      label: 'Important',
      value: 2
    },
    {
      label: 'Normal',
      value: 3
    }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data.task));
  }

}
