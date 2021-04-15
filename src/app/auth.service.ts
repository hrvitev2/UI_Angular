import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as myGlobals from "./globals";
import { Observable, Subject } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  private APIURL = myGlobals.base_api_url;
  constructor(private httpClient: HttpClient) { }

  get CheckLoginStatus() {
    if (localStorage.getItem("userToken")) {
      return true;
    } else {
      return false;
    }
  }

  StoreUserDetailsLocally(Data) {
    localStorage.setItem("AT", Data.token);
  }

  
  login(body) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
    return this.httpClient.post(this.APIURL + 'hrvite/auth/login', body, { headers })
  }
}