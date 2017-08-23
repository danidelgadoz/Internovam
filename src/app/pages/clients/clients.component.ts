import { Component, OnInit } from '@angular/core';

import {Page} from "../../_models/page";
import {Client} from "../../_models/client";
import { ClientService } from '../../_services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  page = new Page();
  rows = new Array<any>();
  
  columns = [
    { prop: 'first_name' },
    { prop: 'email' },
    { prop: 'last_name' },
    { prop: 'mobile_phone' },
    { prop: 'phone' },
    { prop: 'trademark' }
  ];
  selected = [];

  constructor(private clientService: ClientService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo){
    console.log(pageInfo)
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.limit ? pageInfo.limit : this.page.size;    

    this.clientService.list(this.page).subscribe(pagedData => {      
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  /*setPage(pageInfo){    
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.limit ? pageInfo.limit : this.page.size;    

    this.clientService.list(this.page).subscribe( (response:any) => {      
      this.page.totalElements = response.data.total;
      this.page.totalPages = response.data.last_page;
      this.rows = response.data.data;
    });
  }*/

  onSelect({ selected }) {
    console.log('Select Event', selected);
    console.log(this.selected[0]);
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  delete(): void {
    console.log("deleting..");
    document.querySelectorAll('[loadingBackdrop]')[0].classList.toggle('active');    

    this.clientService.delete(this.selected[0].id)
      .subscribe(data => {
        this.setPage({offset:0});
        document.querySelectorAll('[loadingBackdrop]')[0].classList.toggle('active');
      });
  }

}