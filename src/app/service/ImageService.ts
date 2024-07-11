import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageDetails } from '../details/image-details.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:8080/api/image';

  constructor(private http: HttpClient) { }

  addImage(imageData: any, headers: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, imageData, {headers});
  }

  getAllImages(): Observable<ImageDetails[]> {
    return this.http.get<ImageDetails[]>(`${this.baseUrl}/all`);
  }

  deleteImage(imageId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${imageId}`);
  }

  updateImage(imageId: number, updateImageData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${imageId}`, updateImageData);
  }

  // createCatgory(categoryData: any, headers: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/create`, categoryData, { headers });
  // }

  // deleteCategory(categoryId: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/delete/category/${categoryId}`);
  // }

  // updateCategory(categoryId: number, updateCategoryData: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/update/category/${categoryId}`, updateCategoryData);
  // }
}
