import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './components/users/user/user.component';
import {SharedModule} from "../../shared/shared.module";
import {UsersComponent} from "./components/users/users.component";


@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ]
})
export class UsersModule { }
