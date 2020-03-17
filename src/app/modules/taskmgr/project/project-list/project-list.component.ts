import { ProjectService } from './../../services/project.service';
import { listAnimation } from './../../anims/list.anim';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projects;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.service$.get('1').subscribe(project => this.projects = project);
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'New project' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // tslint:disable-next-line: max-line-length
      this.projects = [...this.projects,
      { id: '3', name: 'a new project', desc: 'this is a new project', coverImg: '../../../../../assets/image/covers/8.jpg' },
      { id: '4', name: 'another new project', desc: 'this is another project', coverImg: '../../../../../assets/image/covers/3.jpg' }];
    });
    this.cd.markForCheck();
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'Edit project' } });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { data: { title: 'Delete project', content: 'Do you really want to delete this project?' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
    });
    this.cd.markForCheck();
  }

}
