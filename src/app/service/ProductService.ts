import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductDetails } from '../details/product-details.interface';
import { CategoryDetails } from '../details/category-details.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Api for - products
  addProduct(productData: any, headers: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/products`, productData, { headers });
  }

  getAllProducts(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${this.baseUrl}/all/products`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/product/${productId}`);
  }

  updateProduct(productId: number, updateProductData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/product/${productId}`, updateProductData)
  }

  // Получение продуктов по их категории
  getCategoryProducts(categoryName: any): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${this.baseUrl}/categories/${categoryName}/products`);
  }

  // Api for - categories
  getAllCategoris(): Observable<CategoryDetails[]> {
    return this.http.get<CategoryDetails[]>(`${this.baseUrl}/categories/all`);
  }

}

  // getAllCategoris(): Observable<CategoryDetails[]> {
  //   return this.http.get<CategoryDetails[]>(`${this.baseUrl}/categories/all`)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   console.error('An error occurred:', error.message);
  //   return throwError('Something bad happened; please try again later.');
  // }
