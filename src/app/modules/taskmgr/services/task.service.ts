import { TaskList } from './../domain/task-list.model';
import { Task } from './../domain';
import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {

  private readonly domain = 'tasks';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  add(task: Task): Observable<any> {
    task.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(task), { headers: this.headers })
      .map(res => res);
  }

  update(task: Task): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      ownerId: task.ownerId,
      participantId: task.participantIds,
      remark: task.remark
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res);
  }

  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/taskLists/${task.id}`;
    return this.http.delete(uri).mapTo(task);
  }

  get(taskListId: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'taskListId': taskListId } })
      .map(res => res);
  }

  getByLists(lists: TaskList[]): Observable<any> {
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id))
      .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []);
  }

  complete(task: Task): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      .patch(uri, JSON.stringify({ completed: task.completed }), { headers: this.headers })
      .map(res => res);
  }

  move(taskId: string, taskListId: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http
      .patch(uri, JSON.stringify({ taskListId: taskListId }), { headers: this.headers })
      .map(res => res);
  }

  // moveAll(srcListId: string, targerListId: string): Observable<Task[]> {
  //   return this.get(srcListId)
  //     .mergeMap(tasks => Observable.from(tasks))  // 将取到的所有tasks数组转化成task流
  //     .mergeMap(task => this.move(task.id, targerListId))
  //     .reduce((arr: Task[], task) => [...arr, task], []);
  // }
}
