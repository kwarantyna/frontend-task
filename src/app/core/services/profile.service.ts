import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { IProfile } from "../model/profile.model";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private readonly url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getMyProfile(): Observable<IProfile> {
    return this.httpClient.get<IProfile>(`${this.url}/profile`);
  }
}
