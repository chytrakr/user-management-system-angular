import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userCreateForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    url: new FormControl(''),
    contactNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    userType: new FormControl('admin', Validators.required),
    gender: new FormControl('male', Validators.required),
  });
  userType = [
    {name: 'Admin', value: 'admin'},
    {name: 'Other', value: 'other'}
  ];
  genders = [
    {name: 'Male', value: 'male'},
    {name: 'Female', value: 'female'}
  ];
  constructor(private service: UsersService) { }

  ngOnInit(): void {
  }
  submit() {
    let that = this;
    Swal({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#2ECC71',
      confirmButtonText: 'Yes, Create!',
      cancelButtonText: 'Cancel',
      showCloseButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: false
    }).then( (status) => {
      if (status.value) {
        let postData = Object.assign({}, that.userCreateForm.value);
        that.service.createUser(`http://localhost:3000/api/v1/users/create`, postData).then((resp) => {
          Swal(
            'Success',
            'Created Successfully!',
            'success'
          );
          that.userCreateForm.reset();
        }, (fail) => {
          Swal(
            'Failed!',
            fail.error.message,
            'error'
          );
        });
      }
    });
  }
}
