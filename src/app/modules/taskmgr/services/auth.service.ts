import { Auth } from './../domain/auth.model';
import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'email': user.email } })
      .switchMap(res => {
        if (res) {
          throw new Error('user existed');
        }
        return this.http
          .post(uri, user, { headers: this.headers });
      });
  }

  /**
  * 使用用户名和密码登录
  *
  * @param username 用户名
  * @param password 密码（明文），服务器会进行加密处理
  */
  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get(uri, { params: { 'email': email, 'password': password } })
      .map(res => {
        if (res === 0) {
          throw new Error('Login Failed');
        }
        return {
          token: this.token,
          user: res[0]
        };
      });
  }
}
