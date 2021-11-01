import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  state = 'login';

  loginForm: FormGroup;
  signupForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      street_name: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  loginFormSubmit() {
    this.generalService
      .callApi('post', 'users/login-user', {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe((res) => {
        if (res.success) {
          localStorage.setItem('online_fd_token', res.token);
          this.router.navigateByUrl('/home');
        } else {
          alert(res.result);
        }
      });
  }

  signupFormSubmit() {
    this.generalService
      .callApi('post', 'users/create-user', {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        address: {
          street_name: this.signupForm.value.street_name,
          pincode: this.signupForm.value.pincode,
          city: this.signupForm.value.city,
          state: this.signupForm.value.state,
          country: this.signupForm.value.country,
        },
      })
      .subscribe((res) => {
        if (res.success) {
          this.state = 'login';
        }
      });
  }
}
