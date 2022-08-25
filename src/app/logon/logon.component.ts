import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

// import { AccountService, AlertService } from '../_services';

@Component({
  selector: 'logon-component',
  templateUrl: 'logon.component.html' })
export class LoginComponent implements OnInit {
    loginForm : any = FormGroup;
    loading   = false;
    submitted : boolean = false;
    returnUrl : any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        public toastrService: ToastrService
        // private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this.accountService.userValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required]
      });
    }

    onSubmit() {
      this.loading = true;
      this.accountService.login(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next : (value) => {
            this.loading = false;
            this.router.navigate(['/dashboard']);
            this.toastrService.success('Login!', 'Login Successful!');},
        error : (error) => console.log("error occured during login ",error)
      })
    }

}
