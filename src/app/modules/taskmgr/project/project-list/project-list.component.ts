import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'New project' } });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'Edit project' } });
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { data: { title: 'Delete project', content: 'Do you really want to delete this project?' } });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
