import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Matricula} from '../interfaces/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {

  API_ENDPOINT = 'http://localhost/gesacabackend/public/api';

  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/matriculas');
  }

  getByDni(dni: string) {
    return this.httpClient.get(this.API_ENDPOINT + '/matriculas/dni/' + dni);
  }

  save(matricula: Matricula) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/matriculas', matricula, {headers: headers});
  }

  put(matricula: Matricula) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT + '/matriculas/' + matricula.IdMatricula, matricula, {headers: headers});
  }

}
