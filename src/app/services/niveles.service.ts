import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Nivel } from "../interfaces/gesaca";

@Injectable({
  providedIn: "root"
})
export class NivelesService {
  API_ENDPOINT = "http://localhost/gesacabackend/public/api";

  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get(this.API_ENDPOINT + "/nivels");
  }
}
