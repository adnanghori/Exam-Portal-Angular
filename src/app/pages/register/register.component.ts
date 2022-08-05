import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimationDurations } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserServiceService,private snack:MatSnackBar,private router:Router) { }
  public user ={
    userName:'',
    userFirstName:'',
    userLastName:'',
    userEmail:'',
    userPassword:'',
    userContactNumber:''
  }
  ngOnInit(): void {
  }
  submit(){

      if(this.user.userName==''||this.user.userName==null||this.user.userPassword==''||this.user.userPassword==null||this.user.userEmail==''||this.user.userEmail==null){
        //alert('Field required');
        this.snack.open('fields required','',{
          duration:2000,
          verticalPosition:'top' 
        })
        return;
      }

      // addUser : userService

        this.userService.addUser(this.user).subscribe(
          (data)=>{
            console.log('success')
            this.snack.open('successfully registered','',{
              duration:3000
            })
            this.router.navigate(['/login'])
            
          },
        (error)=>{
          console.log(error);
          this.snack.open('something went wrong','',{
            duration:3000
          })
          this.router.navigate(['/register'])
        }
        )
      
  }
  getInfo(){
    this.userService.getInfo(this.user.userName).subscribe(
      (data)=>{
        console.log('ok')
      },
      (error)=>{
        console.log('no')
      }

    )
  }
}
