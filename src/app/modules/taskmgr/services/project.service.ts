import { Observable } from 'rxjs/Observable';
import { Project } from './../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ProjectService {

  private readonly domain = 'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application-json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  add(project: Project): Observable<any> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), { headers: this.headers })
      .map(res => res);
  }

  update(project: Project): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res);
  }

  del(project: Project): Observable<Project> {
    const delTasks$ = Observable.from(project.taskLists)
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    return delTasks$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }

  get(userId: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: {'members_like': userId} })
      .map(res => res);
  }
}
