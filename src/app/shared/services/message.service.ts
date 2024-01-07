import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(
    private _snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  showMessageForUser(
    message: string,
    param?: { [key: string]: string | number },
  ) {
    let actionLabel = "Users.MessageActionButton";

    this._snackBar.open(
      this.translateService.instant(message, param),
      this.translateService.instant(actionLabel),
    );
  }
}
