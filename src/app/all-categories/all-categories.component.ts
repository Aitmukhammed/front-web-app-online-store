import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/ProductService';
import { CategoryDetails } from '../details/category-details.interface';
import { error } from 'console';
import { CategoryService } from '../service/CategoryService';
import { UpdateCategoryDialogComponent } from '../update-category-dialog/update-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})
export class AllCategoriesComponent implements OnInit {
  categories: CategoryDetails[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.productService.getAllCategoris().subscribe (
      (categories: CategoryDetails[]) => {
        this.categories = categories;
      },
      error => {
        console.error("Error fetching categories: ", error);
      }
    )
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId)
      .subscribe(() => {
        this.categories = this.categories.filter(category => category.id !== categoryId);
      },
      error => {
        console.error('Error deleting category: ', error)
      }
    )
  }

  openUpdateDialog(product: CategoryDetails): void {
    const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, {
      width: '400px',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory(product.id, result);
      }
    });
  }

  updateCategory(productId: number, updatedProductData: any): void {
    this.categoryService.updateCategory(productId, updatedProductData)
      .subscribe(() => {
        this.getAllCategories(); // Лучше вызывать только applyFilter(), но если нужно перезагрузить все продукты...
      },
        error => {
          console.error('Error updating product: ', error);
        });
  }

  // applyFilterCategories(): void {
  //   if (!this.searchText.trim()) {
  //     this.filteredCategories = this.categories;
  //   } else {
  //     this.filteredCategories = this.categories.filter(category =>
  //       category.name.toLowerCase().includes(this.searchText.trim().toLowerCase())
  //     );
  //   }
  //   this.moveAllProductsToTop();
  // }
}
