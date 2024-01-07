import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CoreModule } from "./core/core.module";
import { MatPaginatorTranslated } from "./shared/components/paginator/translate-paginator-intl";
import { SharedModule } from "./shared/shared.module";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorTranslated }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(["en", "pl"]);
    this.translateService.setDefaultLang("en");

    let getLocalStorageItem = localStorage.getItem("language");
    translateService.use(getLocalStorageItem ? getLocalStorageItem : "en");
  }
}

