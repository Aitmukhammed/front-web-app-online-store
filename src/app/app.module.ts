import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ModComponent } from './mod/mod.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ProductFormComponent } from './product-form/product-form.component';
import { TokenStorageService } from './auth/token-storage.service';
import { AddProductDialogComponent } from './add-producting-dialog/add-producting-dialog.component';
import { AdminAllProductsComponent } from './admin-all-products/admin-all-products.component';
import { UpdateProductDialogComponent } from './update-product-dialog/update-product-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { UpdateCategoryDialogComponent } from './update-category-dialog/update-category-dialog.component';
import { AdminImagesComponent } from './admin-images/admin-images.component';
import { UpdateImageDialogComponent } from './update-image-dialog/update-image-dialog.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselSliderImagesComponent } from './carousel-slider-images/carousel-slider-images.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    ModComponent,
    AdminComponent,
    ProductFormComponent,
    AddProductDialogComponent,
    AdminAllProductsComponent,
    UpdateProductDialogComponent,
    CreateCategoryComponent,
    AllCategoriesComponent,
    UpdateCategoryDialogComponent,
    AdminImagesComponent,
    UpdateImageDialogComponent,
    CarouselSliderImagesComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    httpInterceptorProviders,
    TokenStorageService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
