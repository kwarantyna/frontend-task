import { Injectable, OnDestroy } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Injectable()
export class MatPaginatorTranslated
  extends MatPaginatorIntl
  implements OnDestroy
{
  translateSubscription!: Subscription;

  constructor(private translateService: TranslateService) {
    super();
    this.getTranslations();
  }

  getTranslations() {
    this.translateSubscription = this.translateService
      .stream([
        "Paginator.ItemsPerPageLabel",
        "Paginator.NextPageLabel",
        "Paginator.PreviousPageLabel",
        "Paginator.Range",
      ])
      .subscribe(translation => {
        this.itemsPerPageLabel = translation["Paginator.ItemsPerPageLabel"];
        this.nextPageLabel = translation["Paginator.NextPageLabel"];
        this.previousPageLabel = translation["Paginator.PreviousPageLabel"];
        this.changes.next();
      });
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;

    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return this.translateService.instant("Paginator.Range", {
      startIndex,
      endIndex,
      length,
    });
  };

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }
}
