import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/ProductService';
import { TokenStorageService } from '../auth/token-storage.service';
import { AddProductDialogComponent } from '../add-producting-dialog/add-producting-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetails } from '../details/category-details.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from '../details/product-details.interface';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  categories: CategoryDetails[] = [];
  filteredCategories: CategoryDetails[] = [];
  selectedValue?: string;
  products: ProductDetails[] = [];
  showHeader?: boolean = true;
  categoryCode?: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog,
    private overlayContainer: OverlayContainer
  )
  {
    console.log('AdminComponent constructor called')
  }

  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add('custom-overlay-container');

    console.log('AdminComponent ngOnInit called');
    this.route.params.subscribe(params => {
      console.log('Route parameters:', params);
      this.loadCategories();
    });
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

    // formData.category = { categoryCode: formData.categoryCode };
    formData.category = { categoryCode: this.categoryCode };

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

    getCategoriesProducts(name: string): void {
    this.productService.getCategoryProducts(name)
      .subscribe(
        (products: ProductDetails[]) => {
          this.products = products;
          if (name === "Все продукты") {
            this.showHeader = true;
            return;
          } else {
            this.showHeader = false;
          }
        },
        error => {
          console.error('Error fetching categories products: ', error);
        }
      );
  }

  // fetchCategories(): void {
  //   console.log('Fetching all categories...');
  //   const startTime = performance.now();

  //   debugger


  // }

  // getAllCategories(): void {
  //   console.log('Fetching all categories...');
  //   const startTime = performance.now(); // Начало измерения времени

  //   this.productService.getAllCategoris()
  //     .subscribe(
  //       (categories: CategoryDetails[]) => {
  //         const endTime = performance.now(); // Конец измерения времени
  //         console.log(`Categories fetched in ${endTime - startTime} ms`, categories);
  //         this.categories = categories;
  //         this.applyFilterCategories();
  //       },
  //       error => {
  //         console.error('Error fetching categories:', error);
  //       }
  //     );
  // }

  applyFilterCategories(): void {
    console.log('Applying category filters...');
    // if (!this.searchText.trim()) {
      this.filteredCategories = this.categories;
    // } else {
    //   this.filteredCategories = this.categories.filter(category =>
    //     category.name.toLowerCase().includes(this.searchText.trim().toLowerCase())
    //   );
    // }
    // this.moveAllProductsToTop();
  }

}
