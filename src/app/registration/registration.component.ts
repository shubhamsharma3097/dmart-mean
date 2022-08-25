import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm : any = FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { }


  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required,],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(){
    this.loading = true;
    this.accountService.register(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.warn(data);
        },
        error => {

        }
      )

  }

}
