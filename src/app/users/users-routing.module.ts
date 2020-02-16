import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component';
import {CreateUserComponent} from './create-user/create-user.component';


const routes: Routes = [
  {
    path: 'list',
    component: UsersListComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
