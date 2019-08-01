import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  API_ENDPOINT = 'http://localhost/gesacabackend/public/api';

  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/personas');
  }

  getByDni(dni: number) {
    return this.httpClient.get(this.API_ENDPOINT + '/personas/' + dni);
  }

  save(movie: Movie) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/personas', movie, {headers: headers});
  }
}
