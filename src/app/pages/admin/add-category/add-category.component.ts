import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    categoryTitle:'',
    categoryDescription:''
  }
  constructor(private snack:MatSnackBar,private categoryService:CategoryService) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.category.categoryTitle.trim()==''||this.category.categoryTitle==null){
      this.snack.open('Title Required','',{
        duration:3000
      })
      return;
    }
    this.categoryService.addCategory(this.category).subscribe(
      (data:any)=>{
        this.snack.open('success','Category added',{
          duration:3000
        })
        this.category.categoryTitle=''
        this.category.categoryDescription=''
      },
      (error)=>{
        this.snack.open('error:server','',{
          duration:3000
        })
      }
    )
  }
}
