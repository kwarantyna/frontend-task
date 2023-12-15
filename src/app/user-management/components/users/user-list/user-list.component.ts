import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  RoleEnum,
  RoleEnumLabel,
} from 'src/app/user-management/model/role.enum';
import { IUser } from 'src/app/user-management/model/user.model';
import { UserService } from 'src/app/user-management/services/user.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'id',
    'fullName',
    'role',
    'actions',
  ];
  dataSource!: MatTableDataSource<IUser>;
  roleEnum = RoleEnum;
  roleEnumLabel: Record<RoleEnum, string> = RoleEnumLabel;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserPage();
  }

  loadUserPage(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editUser(user: IUser): void {
    this.router.navigate(['users/edit-user', user.id]);
  }

  deleteUser(user: IUser): void {
    this.dialog
      .open(DeleteUserComponent, { data: user })
      .afterClosed()
      .subscribe({
        next: (success) => {
          if (success) {
            this.loadUserPage();
          }
        },
      });
  }
}
