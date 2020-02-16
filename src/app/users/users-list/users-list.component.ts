import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  page = {
    limit: 10,
    count: 0,
    totalPages: 0,
    offset: 0,
    rows: [],
    selected: [],
    search: ''
  };
  customClasses = {
    sortAscending: 'fa fa-sort-asc',
    sortDescending: 'fa fa-sort-desc',
    pagerLeftArrow: 'fa fa-chevron-left',
    pagerRightArrow: 'fa fa-chevron-right',
    pagerPrevious: 'fa fa-step-backward',
    pagerNext: 'fa fa-step-forward'
  };
  loading = false;
  constructor(private service: UsersService, public dialog: MatDialog) {
    this.setPage(this.page);
  }

  ngOnInit(): void {
  }
  setPage(pageInfo) {
    this.page.offset = pageInfo.offset;
    let params = `page=${(pageInfo.offset + 1)}&limit=${pageInfo.limit}&search=${this.page.search}`;
    this.loading = true;
    this.service.fetchTableData(`http://localhost:3000/api/v1/users?${params}`).then((resp) => {
      this.loading = false;
      this.page.rows = resp.docs;
      this.page.count = resp.total;
    }, (data) => {
      this.loading = false;
      this.page.rows = [];
      this.page.count = 0;
    });
  }
  public reload() {
    this.setPage(this.page);
  }

  openDialog(row) {
    const options = {width: '40%', data: row, reload: this.reload};
    const dialogRef = this.dialog.open(UpdateFormComponent, options);

    dialogRef.afterClosed().subscribe(result => {
      this.reload();
    });
  }

}

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: 'update-form.html',
  styleUrls: ['./users-list.component.scss']
})
export class UpdateFormComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateFormComponent>,
    private service: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public reload: () => void
    ) {
  }
  userUpdateForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    url: new FormControl(''),
    contactNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
  hide(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.userUpdateForm.reset({
      fullName: this.data.fullName,
      email: this.data.email,
      url: this.data.url,
      contactNumber: this.data.contactNumber,
      address: this.data.address
    });
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
      confirmButtonText: 'Yes, Update!',
      cancelButtonText: 'Cancel',
      showCloseButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: false
    }).then( (status) => {
      if (status.value) {
        let postData = Object.assign({}, that.userUpdateForm.value);
        that.service.sendData(`http://localhost:3000/api/v1/users/update/${that.data._id}`, postData).then((resp) => {
          Swal(
            'Success',
            'Updated Successfully!',
            'success'
          );
          that.userUpdateForm.reset();
          that.hide();
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
