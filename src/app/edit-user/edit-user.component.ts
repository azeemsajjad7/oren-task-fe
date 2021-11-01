import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private generalSerive: GeneralService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  editForm: FormGroup;
  userData: any;

  ngOnInit() {
    this.generalSerive.callApi('get', 'users/get-user').subscribe((res) => {
      this.userData = res.result;

      this.editForm = this.fb.group({
        username: [this.userData.username, Validators.required],
        street_name: [this.userData.address.street_name, Validators.required],
        pincode: [this.userData.address.pincode, Validators.required],
        city: [this.userData.address.city, Validators.required],
        state: [this.userData.address.state, Validators.required],
        country: [this.userData.address.country, Validators.required],
      });
    });
  }

  editFormSubmit() {
    this.generalSerive
      .callApi('post', 'users/update-user', {
        username: this.editForm.value.username,
        address: {
          street_name: this.editForm.value.street_name,
          pincode: this.editForm.value.pincode,
          city: this.editForm.value.city,
          state: this.editForm.value.state,
          country: this.editForm.value.country,
        },
      })
      .subscribe((res) => {
        if (res.success) {
          this.router.navigateByUrl('/home');
        }
      });
  }

  logout() {
    localStorage.removeItem('online_fd_token');
    this.router.navigateByUrl('/');
  }
}
