import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/Type';
import { TypesService } from 'src/app/services/types/types.service';
import { FormGroup, FormControl } from '@angular/forms'
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  form: any;

  types: Type[] = [];

  constructor(private typesServices: TypesService, private categoriesService : CategoriesService, private router : Router, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.typesServices.GetAll().subscribe(result => {
      this.types = result;
    });

    this.form = new FormGroup({
      name: new FormControl(null),
      icon: new FormControl(null),
      typeId: new FormControl(null)
    });
  }

  get properties () {
    return this.form.controls;
  }

  SubmitForm() : void {
    const category = this.form.value;
    this.categoriesService.NewCategory(category).subscribe(result => {
      this.router.navigate(['categories/listcategories'])
      this.snackBar.open(result.message, "", {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    })
  }

  BackToList() : void {
    this.router.navigate(['categories/listcategories'])
  }

}
