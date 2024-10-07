import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../models/hero.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class SupesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getSupes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${ this.baseUrl}/heroes`);
  }

  getSupeById( id: string ): Observable<Hero | undefined>  {
    return this.httpClient.get<Hero>(`${ this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }

  getAutocomplete(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${ this.baseUrl}/heroes?q=${query}`);
  }

  newSupe(supe: Hero): Observable<Hero> {
    console.log('newSupe');
    return this.httpClient.post<Hero>(`${ this.baseUrl}/heroes`, supe);
  }

  updateSupe(supe: Hero): Observable<Hero> {
    console.log('updateSupe');
    if(!supe.id) throw Error('Supe ID is required');
    return this.httpClient.put<Hero>(`${ this.baseUrl}/heroes/${supe.id}`, supe);
  }

  deleteSupeById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${ this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( err => of(false)),
        map( resp => true)
      )
  }

}
