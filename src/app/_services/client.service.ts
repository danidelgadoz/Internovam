import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';


import 'rxjs/add/operator/toPromise';

import { Client } from '../_models/client';
import {PagedData} from "../_models/paged-data";
import {Page} from "../_models/page";

@Injectable()
export class ClientService {
  private clientUrl = 'http://192.168.1.210:8080/api/v1/clients';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.currentUser).api_token
  });

  constructor(private http: Http, private httpc: HttpClient) { }

  list(page: Page): Observable<PagedData<Client>> {
    let listUrl = `${this.clientUrl}/?page=${page.pageNumber+1}&limit=${page.size}`;
    return this.httpc.get(listUrl)
    .map((res:any) => {
      let pagedData = new PagedData<Client>();
      let data = res.data;
      page.totalElements = data.total;
      page.totalPages = data.last_page;
      pagedData.page = page;
      pagedData.data = data.data;
      return pagedData;
    });
  }

  show(id: number){
    return this.http.get(`${this.clientUrl}/${id}`, {headers: this.headers})
      .map(res => res.json());
  }

  create(_client: Client): Observable<Client> {
    return this.http
        .post(this.clientUrl, _client, {headers: this.headers})
        .map((res:Response) => {
          return res.json();
        });
  }

  update(_client): Observable<Client> {
    console.log(_client);
    return this.http
        .put(`${this.clientUrl}/${_client.id}`, _client, {headers: this.headers})
        .map((res:Response) => {
          return res.json();
        });
  }  
}
