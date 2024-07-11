import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSliderImagesComponent } from './carousel-slider-images.component';

describe('CarouselSliderImagesComponent', () => {
  let component: CarouselSliderImagesComponent;
  let fixture: ComponentFixture<CarouselSliderImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselSliderImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselSliderImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
