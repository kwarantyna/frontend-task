import { Component, HostListener, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { InteractionService } from "./shared/services/interaction.service";

@Component({
  selector: "app-root",
  template: `<app-home></app-home>`,
})
export class AppComponent implements OnInit {
  title = "frontend-task";
  width = window.innerWidth;
  height = window.innerHeight;

  constructor(
    private translateService: TranslateService,
    private interactionService: InteractionService,
  ) {
    this.checkIfMobileResolution();
  }

  ngOnInit(): void {
    const languageCode = localStorage.getItem("language");
    const currentLang = this.translateService.currentLang;

    if (!languageCode) {
      localStorage.setItem("language", currentLang);
    }
  }

  @HostListener("window:resize", ["$event.target"])
  onResize(window: Window): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.checkIfMobileResolution();
  }

  checkIfMobileResolution(): void {
    if (this.width <= 1280 || this.height <= 525) {
      this.interactionService.isMobileResolutionActive(true);
    } else {
      this.interactionService.isMobileResolutionActive(false);
    }
  }
}

