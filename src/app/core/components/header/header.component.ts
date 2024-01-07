import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  languageFlag: "polish-flag.svg" | "english-flag.svg" = "english-flag.svg";
  sidenavOpen!: boolean;

  @Output() onMenuClicked = new EventEmitter<boolean>();

  @Input() isSidenavOpen!: boolean;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.setLanguageFlag();
  }

  setLanguageFlag() {
    if (this.translateService.currentLang.match("pl")) {
      this.languageFlag = "polish-flag.svg";
    } else {
      this.languageFlag = "english-flag.svg";
    }
  }

  changeLanguage(): void {
    if (this.translateService.currentLang.match("pl")) {
      this.translateService.use("en");
      this.setLocalLanguage("en");
      this.languageFlag = "english-flag.svg";
    } else {
      this.translateService.use("pl");
      this.setLocalLanguage("pl");
      this.languageFlag = "polish-flag.svg";
    }
  }

  setLocalLanguage(language: string): void {
    if (localStorage.getItem("language") !== language) {
      localStorage.removeItem("language");
    }
    localStorage.setItem("language", language);
  }

  emitMenuClicked() {
    this.onMenuClicked.emit(true);
  }
}

