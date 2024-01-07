import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class InteractionService {
  isMobileResolution$ = signal<boolean>(false);

  isMobileResolutionActive(isMobileResolution: boolean): void {
    this.isMobileResolution$.set(isMobileResolution);
  }
}
