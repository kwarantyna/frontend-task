import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/user-management/model/user.model';
import { UserService } from 'src/app/user-management/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  user!: IUser;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IUser,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.data;
  }

  deleteUser(): void {
    this.userService.deleteUserById(this.user.id).subscribe({
      next: () => {
        this._snackBar.open(
          `Pomyślnie usunięto użytkownika ${this.user.fullName}`,
          'Ok!'
        );
      },
      error: () => {
        this._snackBar.open('Usuwanie użytkownika nie powiodło się!', 'Ok!');
      },
    });

    this.dialogRef.close(true);
  }
}
