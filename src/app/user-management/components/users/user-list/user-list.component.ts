import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RoleEnum } from "src/app/user-management/model/role.enum";
import { IUser } from "src/app/user-management/model/user.model";
import { UserService } from "src/app/user-management/services/user.service";
import { DeleteUserComponent } from "../delete-user/delete-user.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "position",
    "id",
    "fullName",
    "role",
    "status",
    "actions",
  ];

  dataSource!: MatTableDataSource<IUser>;
  getUsersSubscription!: Subscription;
  totalResults!: number;
  filteredResults = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadUserPage();
  }

  loadUserPage(): void {
    this.getUsersSubscription = this.userService
      .getAllUsers()
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.filterByNameIdOrRole();
        this.totalResults = this.dataSource.filteredData.length;
      });
  }

  filterByNameIdOrRole() {
    this.dataSource.filterPredicate = (data: IUser, filter: string) => {
      const filters = JSON.parse(filter);

      const idOrNameMatch =
        !filters.idName ||
        data.id
          .toString()
          .toLowerCase()
          .includes(filters.idName.toLowerCase()) ||
        data.fullName.toLowerCase().includes(filters.idName.toLowerCase());

      const roleMatch =
        !filters.role ||
        !filters.role.length ||
        filters.role.includes(data.role);

      return idOrNameMatch && roleMatch;
    };
  }

  editUser(user: IUser): void {
    this.router.navigate(["users/edit-user", user.id]);
  }

  deleteUser(user: IUser): void {
    this.dialog
      .open(DeleteUserComponent, { data: user })
      .afterClosed()
      .subscribe({
        next: success => {
          if (success) {
            this.loadUserPage();
          }
        },
      });
  }

  filterUserData(filter: string): void {
    this.dataSource.filter = filter;
    this.setAmountOfFilteredResults(filter);
  }

  setAmountOfFilteredResults(filter: string): void {
    const filteredRoles = JSON.parse(filter).role;
    const roles: string[] = Object.values(RoleEnum);

    const isAllRolesSelected = roles.every((role: string) =>
      filteredRoles.includes(role),
    );

    this.filteredResults = this.dataSource.filteredData.length;
    if (this.filteredResults === this.totalResults && !isAllRolesSelected) {
      this.filteredResults = 0;
    }
  }

  ngOnDestroy(): void {
    this.getUsersSubscription.unsubscribe();
  }
}

