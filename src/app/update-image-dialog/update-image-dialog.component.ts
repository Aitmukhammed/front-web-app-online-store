import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-image-dialog',
  templateUrl: './update-image-dialog.component.html',
  styleUrl: './update-image-dialog.component.css'
})
export class UpdateImageDialogComponent {
  updatedImageData: any = {};

  constructor(
    public dialogRef: MatDialogRef<UpdateImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.updatedImageData = { ...data.image }; // Копируем данные продукта для редактирования
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.updatedImageData);
  }

}
