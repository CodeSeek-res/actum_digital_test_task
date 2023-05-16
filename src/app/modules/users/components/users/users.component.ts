import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../../core/services/users.service";
import {Subject, takeUntil} from "rxjs";
import {SearchUserDTO, UserDTO} from "../../../../core/interfaces/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {ControlConfigModel} from "../../../../core/interfaces/control-config";
import {FilteringOptions} from "../../../../core/interfaces/filtering-options";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: UserDTO[];
  public searchUsersForm: FormGroup;
  public totalCount: number;
  public readonly selectSortByOption = ['followers', 'repositories', 'joined'];
  public readonly displayedColumns = ['avatar_url', 'login', 'id', 'type', 'git_url'];
  private destroy$ = new Subject();

  constructor(private readonly usersService: UsersService, private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchUsersForm = this.formBuilder.group<ControlConfigModel<FilteringOptions>>({
      search: [null],
      sortBy: ['followers'],
      sortDirection: ['asc'],
      pageNumber: [1],
      pageSize: [30],
    })
    this.searchUsers();
  }

  public searchUsers(): void {
    if (this.searchUsersForm.controls['search'].value === '') {
      this.searchUsersForm.controls['search'].setValue(null);
    }
    this.usersService.getUsers(this.searchUsersForm.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: SearchUserDTO) => {
        this.totalCount = value.total_count;
        this.users = value.items;
      })
  }

  public changedPage(event: PageEvent) {
    this.searchUsersForm.controls['pageNumber'].setValue(event.pageIndex);
    this.searchUsersForm.controls['pageSize'].setValue(event.pageSize);
    this.searchUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
