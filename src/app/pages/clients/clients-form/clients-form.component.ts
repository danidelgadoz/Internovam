import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Client } from '../../../_models/client';
import { ClientService } from '../../../_services/client.service';

export class Alert {
    active: boolean;
    title: string;
    message: string;
};

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {
  form: FormGroup;
  title: string;
  client: Client = new Client();

  imageFile : any;
  alert: Alert = { active: false, title: '', message: ''};

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { 
    this.form = formBuilder.group({
      first_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      last_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['ddelgado@internovam.com', [        
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      trademark: [],
      img_trademark: [],
      phone: [],
      mobile_phone: []
    });
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.title = params.get('id') ? 'Edit User' : 'New User';
        return this.clientService.show(+params.get('id'))
      })
      .subscribe(data => {
          console.log(data)
          this.client = data.data;          
      });
  }

  imagesPreview(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (_event:any) => {
            this.imageFile = {
                link: _event.target.result,
                file: event.srcElement.files[0],
                name: event.srcElement.files[0].name
            };            
        }

        reader.readAsDataURL(event.target.files[0]);
    }
  }

  save(): void {
    console.log(this.form.value);
    
    /*let formData = new FormData();
    formData.append('imageFile', this.imageFile.file);
    formData.append('first_name', this.form.value.first_name);
    formData.append('last_name', this.form.value.last_name);
    formData.append('email', this.form.value.email);
    formData.append('trademark', this.form.value.trademark);
    formData.append('img_trademark', this.form.value.img_trademark);
    formData.append('phone', this.form.value.phone);
    formData.append('mobile_phone', this.form.value.mobile_phone);
    console.log(formData);*/

    document.querySelectorAll('[loadingBackdrop]')[0].classList.toggle('active');
    this.clientService.create(this.form.value)
      .subscribe(data => {
        this.alert = { 
          active: true,
          title: 'Client registered!',
          message: 'You successfully read this important alert message.'
        };
        document.querySelectorAll('[loadingBackdrop]')[0].classList.toggle('active');
      });
  }

  update(): void {
    console.log('updating...');
    document.querySelectorAll('[loadingBackdrop]')[0].classList.toggle('active');    
    
    let data = this.form.value;
    data.id = this.client.id;
    console.log(data);
    this.clientService.update(this.form.value)
      .subscribe(data => {
        this.alert = {
          active: true,
          title: 'Client updated!',
          message: 'You successfully read this important alert message.'
        };
        document.querySelectorAll('[loadingBackdrop]')[0].classList.toggle('active');
      });
  }

  reset(): void {
    this.form.reset();    
    this.alert = { active: false, title: '', message: ''};
  }
    
}