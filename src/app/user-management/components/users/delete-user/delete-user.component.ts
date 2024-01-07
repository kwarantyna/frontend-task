import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MessageService } from "src/app/shared/services/message.service";
import { IUser } from "src/app/user-management/model/user.model";
import { UserService } from "src/app/user-management/services/user.service";

@Component({
  selector: "app-delete-user",
  templateUrl: "./delete-user.component.html",
  styleUrls: ["./delete-user.component.scss"],
})
export class DeleteUserComponent implements OnInit {
  user!: IUser;
  param = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IUser,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.user = this.data;
    this.param = { name: this.user.fullName };
  }

  deleteUser(): void {
    this.userService.deleteUserById(this.user.id).subscribe({
      next: () => {
        const message = "Users.DeleteUser.SuccessMessage";
        this.messageService.showMessageForUser(message, this.param);
      },
      error: () => {
        const message = "Users.DeleteUser.ErrorMessage";
        this.messageService.showMessageForUser(message);
      },
    });

    this.dialogRef.close(true);
  }
}

