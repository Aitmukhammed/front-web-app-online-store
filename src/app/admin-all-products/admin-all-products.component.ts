// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../service/ProductService';
// import { ProductDetails } from '../details/product-details.interface';
// import { error } from 'console';
// import { MatDialog } from '@angular/material/dialog';
// import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';

// @Component({
//   selector: 'app-admin-all-products',
//   templateUrl: './admin-all-products.component.html',
//   styleUrls: ['./admin-all-products.component.css']
// })

// export class AdminAllProductsComponent implements OnInit {
//   products: ProductDetails[] = [];
//   deleteIcon = '../assets/images/bin.png';

//   constructor(private productService: ProductService, public dialog: MatDialog) { }

//   ngOnInit(): void {
//     this.getAllProducts();
//   }

//   getAllProducts(): void {
//     this.productService.getAllProducts()
//       .subscribe(
//         (products: ProductDetails[]) => {
//           this.products = products
//         },
//         error => {
//           console.error('Error fethcing products: ', error)
//         }
//       );
//   }

//   deleteProduct(productId: number): void {
//     this.productService.deleteProduct(productId)
//     .subscribe(() => {
//       this.products = this.products.filter(product => product.id !== productId)
//     },
//     error => {
//       console.error('Error deleting product: ', error);
//     }
//     )
//   }

//   openUpdateDialog(product: ProductDetails): void {
//     const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
//       width: '400px',
//       data: { product: product }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateProduct(product.id, result);
//       }
//     });
//   }

//   updateProduct(productId: number, updatedProductData: any): void {
//     this.productService.updateProduct(productId, updatedProductData)
//       .subscribe(() => {
//         this.getAllProducts();
//       },
//       error => {
//         console.error('Error updating product: ', error);
//       });
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/ProductService';
import { ProductDetails } from '../details/product-details.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';

import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-admin-all-products',
  templateUrl: './admin-all-products.component.html',
  styleUrls: ['./admin-all-products.component.css'],

})
export class AdminAllProductsComponent implements OnInit {
  products: ProductDetails[] = [];
  filteredProducts: ProductDetails[] = [];
  searchText: string = '';

  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        (products: ProductDetails[]) => {
          this.products = products;
          this.applyFilter(); // Вызываем здесь
        },
        error => {
          console.error('Error fetching products: ', error)
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
      )
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
