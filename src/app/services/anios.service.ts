import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Anio} from '../interfaces/gesaca';

@Injectable({
  providedIn: 'root'
})
export class AniosService {

  API_ENDPOINT = 'http://localhost/gesacabackend/public/api';

  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/anios');
  }

}
