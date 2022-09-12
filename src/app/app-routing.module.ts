import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './components/Category/list-categories/list-categories.component';
import { NewCategoryComponent } from './components/Category/new-category/new-category.component';
import { UpdateCategoryComponent } from './components/Category/update-category/update-category.component';

const routes: Routes = [
  {
    path: 'categories/listcategories',
    component: ListCategoriesComponent
  },
  {
    path: 'categories/newcategories',
    component: NewCategoryComponent
  },
  {
    path: 'categories/updatecategory/:id',
    component: UpdateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
