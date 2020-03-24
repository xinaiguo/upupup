import { TaskList } from './../domain';
import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {

  private readonly domain = 'taskLists';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  add(taskList: TaskList): Observable<any> {
    taskList.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), { headers: this.headers })
      .mapTo(taskList);
  }

  update(taskList: TaskList): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name,
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .mapTo(taskList);
  }

  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/taskLists/${taskList.id}`;
    return this.http.delete(uri).mapTo(taskList);
  }

  get(projectId: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'projectId': projectId } });
  }

  swapOrder(src: TaskList, target: TaskList): Observable<any> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({ order: target.order }), { headers: this.headers })
      .map(res => res);
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({ order: src.order }), { headers: this.headers })
      .map(res => res);
    return Observable
      .concat(drag$, drop$)
      .reduce((arrs: TaskList[], list) => ([...arrs, list]), []);
  }

}
