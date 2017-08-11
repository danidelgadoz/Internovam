import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  model: any = {
    email: "admin@gn7app.com",
    password: "admin$"
  };
  loading = false;
  message : string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {    
  }

  loginUser(value : any) {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
          if (data.auth)
            this.router.navigate(['/dashboard']);
          else
            this.message = data.data;
        },
        error => {
          console.error(error);          
        }
      );
  }

}
