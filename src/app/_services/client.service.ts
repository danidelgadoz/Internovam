import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Client } from '../_models/client';

@Injectable()
export class ClientService {
  private clientUrl = 'http://localhost:8000/api/v1/clients';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  create(_client): Observable<Client> {
    return this.http
        .post(this.clientUrl, JSON.stringify(_client), {headers: this.headers})
        .map((res:Response) => {          
          return res.json();
        })   
        .catch((error:any) =>  {
          console.log('error', error);
          return Observable.throw(error.json().error || 'Server error') 
        });
  }

}
