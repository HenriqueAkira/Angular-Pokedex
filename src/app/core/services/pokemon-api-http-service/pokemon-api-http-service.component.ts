import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  template: ''
})
export class PokemonApiHttpServiceComponent implements OnInit {

  readonly API_URL : string;

  constructor(private http : HttpClient) {
    this.API_URL = 'https://pokeapi.co/api/v2/pokemon'
  }

  getPokemonById(id : number): Observable<any> {
    return this.http.get(`${this.API_URL}/ + ${id}`)
  }

  getPokemonByName(name : string): Observable<any> {
    return this.http.get(`${this.API_URL}/ + ${name}`)
  }

  getPokemonByUrl(url : string): Observable<any> {
    return this.http.get(url)
  }

  getAllPokemons(): Observable<any> {
    return this.http.get(`${this.API_URL}/?limit=809`) //1118
  }

  ngOnInit(): void {
  }

}
