import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly baseUrl = environment.apiUrl;

  // private baseUrl = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) {}

  getPaginatedPokemon(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }

  getAllDetailsForList(list: any[]): Observable<any[]> {
    return forkJoin(list.map(p => this.getPokemonDetails(p.name)));
  }
}
