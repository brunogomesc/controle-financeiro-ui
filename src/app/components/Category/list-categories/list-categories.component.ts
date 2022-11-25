import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service'
import { MatTableDataSource } from '@angular/material/table'
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs';
import { startWith, map } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})

export class ListCategoriesComponent implements OnInit {

  categories = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  autoCompleteInput = new FormControl();
  optionsCategories : string[] = [];
  namesCategories!: Observable<string[]>;

  @ViewChild(MatPaginator, {static: true})
  paginator! : MatPaginator;

  @ViewChild(MatSort, {static: true}) 
  sort! : MatSort;

  constructor(private categoriesService: CategoriesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriesService.GetAll().subscribe(result => {
      result.forEach(category => {
        this.optionsCategories.push(category.name);
      });
      this.categories.data = result;
      this.categories.paginator = this.paginator;
      this.categories.sort = this.sort;
    });

    this.displayedColumns = this.ViewColumns();
    this.namesCategories = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(name => this.FilterNames(name)));
  }

  ViewColumns(): string[] {
    return ['name','icon','type','actions']
  }

  OpenDialog(categoryId: any, name: any): void {
    this.dialog.open(DialogRemoveCategoriesComponent, {
      data: {
        categoryId: categoryId,
        name: name
      }
    }).afterClosed().subscribe(result => {
      if(result === true) {
        this.categoriesService.GetAll().subscribe(data => {
          this.categories.data = data;
        })
        this.displayedColumns = this.ViewColumns();
      }
    })
  }

  FilterNames(name: string): string[] {
    if(name.trim().length >= 1) {
      this.categoriesService.FilterCategories(name).subscribe(result => {
        this.categories.data = result;
      })
    }
    else {
      if(name === '') {
        this.categoriesService.GetAll().subscribe(result => {
          this.categories.data = result;
        })
      }
    }
    return this.optionsCategories.filter(category => {
      category.toLowerCase().includes(name.toLowerCase());
    });
  }

}

@Component({
  selector: 'app-dialog-remove-categories',
  templateUrl: 'dialog-remove-categories.html'
})

export class DialogRemoveCategoriesComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private categoriesService: CategoriesService,
  private snackBar: MatSnackBar) {}

  RemoveCategories(categoryId: number): void {
    this.categoriesService.DeleteCategory(categoryId).subscribe(result => {
      this.snackBar.open(result.message, "", {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    });
  }
}
