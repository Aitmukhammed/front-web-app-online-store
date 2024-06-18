import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-producting-dialog.component.html',
  styleUrls: ['./add-producting-dialog.component.css']
})
export class AddProductDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
