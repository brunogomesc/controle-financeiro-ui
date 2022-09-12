import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Type } from 'src/app/models/Type';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { TypesService } from 'src/app/services/types/types.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  nameCategory: string = '';
  category : Observable<Category> = new Observable<Category>;
  types: Type[] = [];
  form: any;
  categoryId: number = 0;

  constructor(private router : Router, 
    private route : ActivatedRoute, 
    private typesServices : TypesService,
    private categoriesServices : CategoriesService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.typesServices.GetAll().subscribe(result => {
      this.types = result
    });

    this.categoriesServices.GetCategoryById(this.categoryId).subscribe(result => {
      this.nameCategory = result.name;
      this.form = new FormGroup({
        categoryId: new FormControl(result.categoryId),
        name: new FormControl(result.name),
        icon: new FormControl(result.icon),
        typeId: new FormControl(result.typeId)
      });
    });
  }

  get properties() {
    return this.form.controls;
  }

  BackToList() : void {
    this.router.navigate(['categories/listcategories']);
  }

  SubmitForm() : void {
    const category = this.form.value;
    this.categoriesServices.UpdateCategory(this.categoryId, category).subscribe(result => {
      this.router.navigate(['categories/listcategories']);
    })
  }

}
