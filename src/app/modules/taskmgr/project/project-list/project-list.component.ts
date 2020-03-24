import { Subscription } from 'rxjs/Subscription';
import { Project } from './../../domain/project.model';
import { ProjectService } from './../../services/project.service';
import { listAnimation } from './../../anims/list.anim';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;

  projects;
  sub: Subscription;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$.get('1').subscribe(project => {
      this.projects = project;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/image/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { thumbnails: this.getThumnails(), img: selectedImg } });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, { data: { members: [] } });
  }

  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { thumbnails: this.getThumnails(), project: project } });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) }))
      .switchMap(v => this.service$.update(v))
      .subscribe(prj => {
        const index = this.projects.map(p => p.id).indexOf(prj.id);
        this.projects = [...this.projects.slice(0, index), prj, ...this.projects.slice(index + 1)];
        this.cd.markForCheck();
      });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { data: { title: 'Delete project', content: 'Do you really want to delete this project?' } });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(_ => this.service$.del(project))
      .subscribe(prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id);
      });
    this.cd.markForCheck();
  }

  private getThumnails() {
    return _.range(0, 40).map(i => `/assets/image/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }

}
