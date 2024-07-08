import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }

  // getAllCategories(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/all`);
  // }

  createCatgory(categoryData: any, headers: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, categoryData, { headers });
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/category/${categoryId}`);
  }

  updateCategory(categoryId: number, updateCategoryData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/category/${categoryId}`, updateCategoryData);
  }
}
