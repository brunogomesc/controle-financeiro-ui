import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  categories = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.GetAll().subscribe(result => {
      this.categories.data = result;
    });

    this.displayedColumns = this.ViewColumns();
  }

  ViewColumns(): string[] {
    return ['name','icon','type','actions']
  }

}
