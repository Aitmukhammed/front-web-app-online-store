import { Component, Inject, OnInit, ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../service/ProductService';
import { CategoryDetails } from '../details/category-details.interface';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrl: './update-product-dialog.component.css',
  encapsulation: ViewEncapsulation.None // Добавьте эт
})
export class UpdateProductDialogComponent implements OnInit{
  updatedProductData: any = {};
  categories: CategoryDetails[] = [];
  filteredCategories: CategoryDetails[] = [];
  categoryCode?: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    this.updatedProductData = { ...data.product }; // Копируем данные продукта для редактирования
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getAllCategoris()
      .subscribe(
        (categories: CategoryDetails[]) => {
          this.categories = categories;
          this.applyFilterCategories();
        },
        error => {
          console.error('Error fetching categories:', error);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.updatedProductData);
  }

  applyFilterCategories(): void {
      this.filteredCategories = this.categories;
  }

}
