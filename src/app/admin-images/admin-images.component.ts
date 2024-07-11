import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/ImageService';
import { ImageDetails } from '../details/image-details.interface';
import { error } from 'console';
import { TokenStorageService } from '../auth/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateImageDialogComponent } from '../update-image-dialog/update-image-dialog.component';


@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrl: './admin-images.component.css',
})
export class AdminImagesComponent implements OnInit {
  images: ImageDetails[] = [];
  btnBool: boolean = false;
  constructor(
    private imageService: ImageService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllImages();
  }

  toggleButtonAndFetchImages() {
    this.btnBool = !this.btnBool;
    this.getAllImages();
  }

  openUpdateDialog(image: ImageDetails): void {
    const dialogRef = this.dialog.open(UpdateImageDialogComponent, {
      width: '400px',
      data: { image: image }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateImage(image.id, result);
      }
    });
  }

  onSubmit(formData: any, imageForm: any) {
    if (imageForm.invalid) {
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

    this.imageService.addImage(formData, headers).subscribe(
      response => {
        console.log('Product added successfully:', response);
        imageForm.reset(); // Очистить форму
        imageForm.submitted = false; // Сбросить состояние отправки
      },
      error => {
        console.error('Error adding product:', error);
        console.error('Headers: ', headers);
        console.error('Form Data: ', formData);
      }
    );
  }

  getAllImages(): void {
    this.imageService.getAllImages()
      .subscribe(
        (images: ImageDetails[]) => {
          this.images = images;
        },
        error => {
          console.error("Error fetching images: ", error);
        }
      )
  }

  updateImage(imageId: number, updatedImageData: any): void {
    this.imageService.updateImage(imageId, updatedImageData)
      .subscribe(() => {
        this.getAllImages(); // Лучше вызывать только applyFilter(), но если нужно перезагрузить все продукты...
      },
        error => {
          console.error('Error updating image: ', error);
        });
  }

  deleteImage(imageId: number): void {
    this.imageService.deleteImage(imageId)
      .subscribe(() => {
        this.images = this.images.filter(image => image.id !== imageId);
      },
      error => {
        console.error('Error deleting image: ', error);
      })
  }

}
