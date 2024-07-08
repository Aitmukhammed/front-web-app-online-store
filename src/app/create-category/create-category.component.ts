import { Component } from '@angular/core';
import { CategoryService } from '../service/CategoryService';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private tokenStorage: TokenStorageService
  ) {
    console.log('CreateCategoryComponent constructor called')
  }

  onSubmit(formData: any, productForm: any) {
    if (productForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const token = this.tokenStorage.getToken();
    if (!token) {
      console.error('Токен отсутствует, пользователь не аутентифицирован.');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.categoryService.createCatgory(formData, headers).subscribe(
      response => {
        console.log('Product added successfully:', response);
        productForm.reset(); // Очистить форму
        productForm.submitted = false; // Сбросить состояние отправки
        // this.openDialog();
      },
      error => {
        console.error('Error adding product:', error);
        console.error('Headers: ', headers);
        console.error('Form Data: ', formData);
      }
    );
  }

}
