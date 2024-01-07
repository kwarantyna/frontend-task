import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RoleEnum } from "src/app/user-management/model/role.enum";

@Component({
  selector: "app-user-filter",
  templateUrl: "./user-filter.component.html",
  styleUrls: ["./user-filter.component.scss"],
})
export class UserFilterComponent implements OnInit {
  form!: FormGroup;
  roleEnum: RoleEnum[] = Object.values(RoleEnum);
  @Input() results = 0;

  @Output() onSearch = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      idName: [""],
      role: [""],
    });
  }

  emitFilters(): void {
    let filterUsers = JSON.stringify(this.form.value);
    this.onSearch.emit(filterUsers);
  }
}

