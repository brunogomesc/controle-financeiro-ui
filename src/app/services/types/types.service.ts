import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from 'src/app/models/Type';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  url: string = 'https://localhost:7049/api/types'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Type[]> {
    return this.http.get<Type[]>(this.url);
  }
}
