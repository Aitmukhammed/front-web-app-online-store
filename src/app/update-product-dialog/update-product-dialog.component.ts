import { Component, Inject, ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrl: './update-product-dialog.component.css',
  encapsulation: ViewEncapsulation.None // Добавьте эт
})
export class UpdateProductDialogComponent {
  updatedProductData: any = {};

  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedProductData = { ...data.product }; // Копируем данные продукта для редактирования
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.updatedProductData);
  }
}
