import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly GET_USERS_API = 'https://api.github.com/users';

  constructor(private readonly httpClient: HttpClient) { }

  public getUsers(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(this.GET_USERS_API);
  }
}
