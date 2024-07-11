import { Component, OnInit } from '@angular/core';
import { ImageDetails } from '../details/image-details.interface';
import { ImageService } from '../service/ImageService';

@Component({
  selector: 'app-carousel-slider-images',
  templateUrl: './carousel-slider-images.component.html',
  styleUrl: './carousel-slider-images.component.css'
})
export class CarouselSliderImagesComponent implements OnInit{
  images: ImageDetails[] = [];

  constructor(private imageService: ImageService) {}

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


}
