import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Persona} from '../interfaces/gesaca';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  API_ENDPOINT = 'http://localhost/gesacabackend/public/api';

  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/personas');
  }

  getById(id: number) {
    return this.httpClient.get(this.API_ENDPOINT + '/personas/' + id);
  }

  getByDni(dni: string) {
    return this.httpClient.get(this.API_ENDPOINT + '/personas/dni/' + dni);
  }

  save(persona: Persona) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/personas', persona, {headers: headers});
  }

  put(persona: Persona) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT + '/personas/' + persona.IdPersona, persona, {headers: headers});
  }

}
