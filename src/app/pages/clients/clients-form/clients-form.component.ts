import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Client } from '../../../_models/client';
import { ClientService } from '../../../_services/client.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {
  clientForm =  new FormGroup({
    first_name: new FormControl("Daniel", Validators.required),
    last_name: new FormControl("Delgado", Validators.required),
    email: new FormControl("ddelgado@internovam.com", Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')),
    trademark: new FormControl(),
    img_trademark: new FormControl(),
    phone: new FormControl(5487454),
    mobile_phone: new FormControl(98764511),
  });

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  save(): void {
    console.log(this.clientForm.value);

    this.clientService.create(this.clientForm.value)
      .subscribe(data => {
        console.log("In component", data)
      });
  }
    
}
