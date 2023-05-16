import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../../core/services/users.service";
import {Subject, takeUntil} from "rxjs";
import {UserDTO} from "../../../../core/interfaces/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: UserDTO[] = [];
  public readonly displayedColumns = ['avatar_url', 'login', 'id', 'type', 'git_url' ]
  private destroy$ = new Subject();

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.users = value;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
