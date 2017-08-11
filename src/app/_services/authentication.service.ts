import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router }            from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private router: Router) { }

  private authUrl = 'http://apiv2.gn7logistic.com:3000';

  login(username: string, password: string) {
    let data = {
        correo: username,
        contrasena: password
    }
    
    return this.http.post(`${this.authUrl}/usuario/auth`, data)
      .map((response: Response) => {
        let body = response.json();
        if (body.auth) {
            localStorage.setItem('currentUser', JSON.stringify(body.data));
        }
        return body;
      });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

}
