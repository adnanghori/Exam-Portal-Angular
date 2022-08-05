import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories:any=[]
  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data)=>{
        this.categories = data;
      },
      (error)=>{
        this.snack.open('Error','SE',{
          duration:3000
        })
      }

    )
  }
  public logout(){  
      this.loginService.logOut();
      this.router.navigate(['/login'])
  }

}
