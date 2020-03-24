import { Project } from './../domain/project.model';
import { User } from './../domain/user.model';
import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  searchUsers(filter: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'email_like': filter } });
  }

  getUsersByProject(projectId: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'projectId': projectId } });
  }

  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user);
    }
    return this.http
      .patch(uri, JSON.stringify({ projectIds: [...projectIds, projectId] }), { headers: this.headers })
      .mapTo(user);
  }

  removeProjectRef(user: User, projectId: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return Observable.of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http
      .patch(uri, JSON.stringify({ projectIds: toUpdate }), { headers: this.headers });
  }

  batchUpdateProjectRef(project: Project): Observable<any> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return Observable.from(memberIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri);
      })
      .filter((user: User) => user.projectIds.indexOf(project.id) === -1)
      .switchMap((u: User) => this.addProjectRef(u, projectId))
      .reduce((arr: [], curr) => [...arr, curr], []);
  }

}
