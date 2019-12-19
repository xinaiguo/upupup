import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      name: 'project 1',
      desc: 'project1 describe',
      coverImg: '../../../../../assets/image/covers/0.jpg'
    },
    {
      name: 'project 2',
      desc: 'project2 describe',
      coverImg: '../../../../../assets/image/covers/1.jpg'
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog(){
    this.dialog.open();
  }

}
