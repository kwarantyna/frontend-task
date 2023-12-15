import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  RoleEnum,
  RoleEnumLabel,
} from 'src/app/user-management/model/role.enum';
import { IUser, UserDto } from 'src/app/user-management/model/user.model';
import { UserService } from 'src/app/user-management/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  roleEnum: RoleEnum[] = Object.values(RoleEnum);
  roleEnumLabel: Record<RoleEnum, string> = RoleEnumLabel;
  buttonLabel: string = 'Dodaj użytkownika';

  user!: UserDto;
  editMode: boolean = false;

  @Input() userEditData?: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.userEditData) {
      this.editMode = true;
      this.fillFormWithExistingUser(this.userEditData);
      this.buttonLabel = 'Edytuj użytkownika';
      this.form.get('id')?.disable();
    }
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.maxLength(50)]],
      role: ['', [Validators.required]],
    });
  }

  fillFormWithExistingUser(user: IUser): void {
    const fullName: string[] = user.fullName.split(' ');
    const firstName: string = fullName[0];

    if (fullName.length > 1) {
      const lastName = fullName[1];
      this.form.get('lastName')?.setValue(lastName);
    }

    this.form.get('id')?.setValue(user.id);
    this.form.get('firstName')?.setValue(firstName);
    this.form.get('role')?.setValue(user.role);
  }

  concatAndRemoveReduntantFields() {
    const firstName = this.form.value.firstName;
    const lastName = this.form.value.lastName;
    const fullName = firstName.concat(' ', lastName);

    delete this.form.value.firstName;
    delete this.form.value.lastName;

    return fullName;
  }

  saveUser(): void {
    this.form.value.fullName = this.concatAndRemoveReduntantFields();

    if (!this.userEditData) {
      this.user = new UserDto(this.form.value);

      this.userService.addNewUser(this.user).subscribe({
        next: () => {
          this._snackBar.open(
            `Pomyślnie dodano użytkownika ${this.user.fullName}`,
            'Ok!'
          );
          this.router.navigate(['/users/user-list/']);
        },

        error: () => {
          this._snackBar.open('Dodawanie użytkownika nie powiodło się!', 'Ok!');
        },
      });
    } else {
      this.user = new UserDto(this.form.value);
      this.user.id = this.userEditData.id;

      this.userService
        .editExistingUser(this.user.id.toString(), this.user)
        .subscribe({
          next: () => {
            this._snackBar.open(
              `Pomyślnie edytowano użytkownika o ID: ${this.user.id}`,
              'Ok!'
            );
            this.router.navigate(['/users/user-list/']);
          },

          error: () => {
            this._snackBar.open(
              'Edytowanie użytkownika nie powiodło się!',
              'Ok!'
            );
          },
        });
    }
  }

  get id() {
    return this.form.get('id') as FormControl;
  }

  get firstName() {
    return this.form.get('firstName') as FormControl;
  }

  get lastName() {
    return this.form.get('lastName') as FormControl;
  }
  get role() {
    return this.form.get('role') as FormControl;
  }
}
