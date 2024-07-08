import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/ImageService';
import { ImageDetails } from '../details/image-details.interface';
import { error } from 'console';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrl: './admin-images.component.css'
})
export class AdminImagesComponent implements OnInit {
  images: ImageDetails[] = [];
  constructor(private imageService: ImageService) {

  }

  ngOnInit(): void {
    this.getAllImages();
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
