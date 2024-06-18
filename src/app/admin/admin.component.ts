import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/ProductService';
import { CategoryService } from '../service/CategoryService';
import { TokenStorageService } from '../auth/token-storage.service';
import { AddProductDialogComponent } from '../add-producting-dialog/add-producting-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(
    private productService: ProductService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog
  ) { }

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

    formData.category = { id: formData.category };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.productService.addProduct(formData, headers).subscribe(
      response => {
        console.log('Product added successfully:', response);
        productForm.reset(); // Очистить форму
        productForm.submitted = false; // Сбросить состояние отправки
        this.openDialog();
      },
      error => {
        console.error('Error adding product:', error);
        console.error('Headers: ', headers);
        console.error('Form Data: ', formData);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
