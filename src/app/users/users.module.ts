import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UpdateFormComponent, UsersListComponent} from './users-list/users-list.component';
import {MatTableModule} from '@angular/material/table';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {UsersService} from './users.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CreateUserComponent } from './create-user/create-user.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [UsersListComponent, UpdateFormComponent, CreateUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxDatatableModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [UsersService]
})
export class UsersModule { }
