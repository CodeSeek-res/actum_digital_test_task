import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, concat, Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { ControlConfigModel } from '../../../../core/interfaces/control-config';
import { FilteringOptions } from '../../../../core/interfaces/filtering-options';
import { SearchUserDTO, UserDTO } from '../../../../core/interfaces/user';
import { UsersService } from '../../../../core/services/users.service';
import { fadeOut } from '../../../../core/animation/mat-table-animation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeOut],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: UserDTO[] = [];
  public isUsers: boolean = true;
  public searchUsersForm: FormGroup;
  public totalCount: number;
  public readonly selectSortByOption = ['followers', 'repositories', 'joined'];
  public readonly displayedColumns = ['avatar_url', 'login', 'id', 'type', 'git_url'];
  private destroy$ = new Subject<boolean>();

  constructor(
    private readonly usersService: UsersService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchUsersForm = this.formBuilder.group<ControlConfigModel<FilteringOptions>>({
      search: ['Angular', Validators.required],
      sortBy: ['repositories'],
      sortDirection: ['asc'],
      pageNumber: [1],
      pageSize: [30],
    });

    concat(of(this.searchUsersForm.getRawValue()), this.searchUsersForm.valueChanges.pipe(debounceTime(500)))
      .pipe(
        switchMap((value) => this.getUsers(value)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          if (value.items.length) this.isUsers = true;
          this.totalCount = value.total_count;
          this.users = value.items;
        },
        error: (err) => this.openSnackBar(err.message),
      });
  }

  public changePage(event: PageEvent): void {
    event.pageIndex += 1;
    this.searchUsersForm.patchValue({
      pageNumber: event.pageIndex,
      pageSize: event.pageSize,
    });
  }

  private getUsers(searchParams: FilteringOptions): Observable<SearchUserDTO> {
    const filterOptions: FilteringOptions = searchParams;
    if (filterOptions.search === '') {
      this.isUsers = false;
      return of({
        total_count: 0,
        items: [],
      });
    }
    return this.usersService.getUsers(filterOptions).pipe(
      catchError((err) => {
        this.openSnackBar(err.message);
        return [];
      })
    );
  }

  private openSnackBar(message: string, action = 'Close', duration = 3000): void {
    this.snackBar.open('Error: ' + message, action, { duration: duration });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
