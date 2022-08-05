import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any=null;
  constructor(private loginService:LoginService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(
      (data)=>{
        this.user = data;
      },
      (error)=>{
        this.snack.open('Error','OK',{
          duration:3000
        })
      }
    )
  }

}
