import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
categories:any=[];

  constructor(private categoryService:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        this.snack.open('Error','',{
          duration:3000
        })
      }
    )
  }

}
