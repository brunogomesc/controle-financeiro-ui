import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = 'https://localhost:7049/api/categories'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.url);
  }

  GetCategoryById(categoryId: number) : Observable<Category> {
    const apiUrl = `${this.url}/${categoryId}`;
    return this.http.get<Category>(apiUrl);
  }

  NewCategory(category: Category) : Observable<any> {
    return this.http.post<Category>(this.url, category, httpOptions)
  }

  UpdateCategory(categoryId: number, category: Category): Observable<any> {
    const apiUrl = `${this.url}/${categoryId}`;
    return this.http.put<Category>(apiUrl, category, httpOptions)
  }

  DeleteCategory(categoryId: number): Observable<any> {
    const apiUrl = `${this.url}/${categoryId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  FilterCategories(nameCategory: string): Observable<Category[]> {
    const apiUrl = `${this.url}/FilterCategories/${nameCategory}`;
    return this.http.get<Category[]>(apiUrl);
  }

}
