import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { SearchUserDTO } from '../interfaces/user';
import { FilteringOptions } from '../interfaces/filtering-options';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly GET_SEARCH_USERS_API = 'https://api.github.com/search/users';

  // We know it isn't the best way to store token,
  // but this increases the rate limits and makes testing easier
  private readonly GITHUB_ACCESS_TOKEN = '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';

  constructor(private readonly httpClient: HttpClient) {}

  public getUsers(filterOptions: FilteringOptions): Observable<SearchUserDTO> {
    const params = new HttpParams()
      .set('q', filterOptions.search)
      .set('sort', filterOptions.sortBy)
      .set('order', filterOptions.sortDirection)
      .set('per_page', filterOptions.pageSize)
      .set('page', filterOptions.pageNumber);
    return this.httpClient.get<SearchUserDTO>(this.GET_SEARCH_USERS_API, {
      headers: { Authorization: 'Bearer ' + this.GITHUB_ACCESS_TOKEN },
      params,
    });
  }
}
