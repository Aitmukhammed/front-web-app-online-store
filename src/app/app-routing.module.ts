import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAllProductsComponent } from './admin-all-products/admin-all-products.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AdminImagesComponent } from './admin-images/admin-images.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
      path: 'admin',
      component: AdminComponent
  },
  {
      path: 'all-admin-products',
      component: AdminAllProductsComponent
  },
  {
      path: 'create-category',
      component: CreateCategoryComponent
  },
  {
      path: 'all-categories',
      component: AllCategoriesComponent
  },
  {
      path: 'images',
      component: AdminImagesComponent
  },
  {
      path: 'auth/login',
      component: LoginComponent
  },
  {
      path: 'signup',
      component: RegisterComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' } // Добавлено для обработки всех некорректных маршрутов
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
