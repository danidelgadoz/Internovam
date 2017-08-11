import { Component } from '@angular/core';
import {MockServerResultsService} from "../../_services/mock-server-results-service";
import {PagedData} from "../../_models/paged-data";
import {CorporateEmployee} from "../../_models/corporate-employee";
import {Page} from "../../_models/page";

@Component({
  selector: 'server-paging-demo',
  providers: [
      MockServerResultsService
  ],
  template: `
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="[{name:'Name'},{name:'Gender'},{name:'Company'}]"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [externalPaging]="true"
        [count]="page.totalElements"
        [offset]="page.pageNumber"
        [limit]="page.size"
        (page)='setPage($event)'>
      </ngx-datatable>
  `
})
export class ServerPagingComponent {

  page = new Page();
  rows = new Array<CorporateEmployee>();

  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    console.log(this.page);
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

}
