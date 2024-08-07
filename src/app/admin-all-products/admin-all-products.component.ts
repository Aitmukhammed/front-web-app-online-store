import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/ProductService';
import { ProductDetails } from '../details/product-details.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';
import { catchError, timeout } from 'rxjs/operators';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { error } from 'console';
import { CategoryDetails } from '../details/category-details.interface';
import { of } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-admin-all-products',
  templateUrl: './admin-all-products.component.html',
  styleUrls: ['./admin-all-products.component.css'],
})
export class AdminAllProductsComponent implements OnInit {
  products: ProductDetails[] = [];
  filteredProducts: ProductDetails[] = [];
  errorMessage: string = '';
  categories: CategoryDetails[] = [];
  filteredCategories: CategoryDetails[] = [];

  searchText: string = '';

  selectedValue?: string;
  selectedCar?: string;

  showHeader?: boolean = true;

  constructor(private productService: ProductService, public dialog: MatDialog, private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.overlayContainer.getContainerElement().classList.add('custom-overlay-container');
  }

  getAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        (products: ProductDetails[]) => {
          this.products = products;
          this.applyFilter(); // Вызываем здесь
        },
        error => {
          console.error('Error fetching products: ', error);
        }
      );
  }

  getAllCategories(): void {
    this.productService.getAllCategoris()
      .subscribe(
        (categories: CategoryDetails[]) => {
          this.categories = categories;
          this.applyFilterCategories();
        },
        error => {
          console.error('Error fetching categories: ', error);
        }
      );
  }

  applyFilterCategories(): void {
    if (!this.searchText.trim()) {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchText.trim().toLowerCase())
      );
    }
    this.moveAllProductsToTop();
  }

  moveAllProductsToTop(): void {
    const allProductsIndex = this.filteredCategories.findIndex(category => category.name === 'Все продукты');
    if (allProductsIndex > -1) {
      const allProductsCategory = this.filteredCategories.splice(allProductsIndex, 1)[0];
      this.filteredCategories.unshift(allProductsCategory);
    }
  }

  getCategoriesProducts(name: string): void {
    this.productService.getCategoryProducts(name)
      .subscribe(
        (products: ProductDetails[]) => {
          this.products = products;
          if (name === "Все продукты") {
            this.showHeader = true;
            this.getAllProducts();
            return;
          } else {
            this.showHeader = false;
          }
          this.applyFilter();
        },
        error => {
          console.error('Error fetching categories products: ', error);
        }
      );
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId)
      .subscribe(() => {
        this.products = this.products.filter(product => product.id !== productId);
        this.applyFilter();
      },
        error => {
          console.error('Error deleting product: ', error);
        }
      );
  }

  openUpdateDialog(product: ProductDetails): void {
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '400px',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(product.id, result);
      }
    });
  }

  updateProduct(productId: number, updatedProductData: any): void {
    this.productService.updateProduct(productId, updatedProductData)
      .subscribe(() => {
        this.getAllProducts(); // Лучше вызывать только applyFilter(), но если нужно перезагрузить все продукты...
      },
        error => {
          console.error('Error updating product: ', error);
        });
  }

  applyFilter(): void {
    if (!this.searchText.trim()) {
      this.filteredProducts = this.products;
      return;
    }
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.trim().toLowerCase())
    );
  }
}
