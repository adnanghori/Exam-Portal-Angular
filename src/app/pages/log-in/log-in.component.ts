import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    loginData={
      username : '',
      password : ''
    }
  constructor(private snack:MatSnackBar,private loginservice:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  submit(){
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.snack.open('Username is required','',{
        duration:3000
      });
      return;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open('Password is required','',{
        duration:3000
      });
      return;
    }
    // request to server
     this.loginservice.generateToken(this.loginData).subscribe(
      (data:any)=>{

        this.loginservice.loginUser(data.token);
       this.loginservice.getCurrentUser().subscribe(
        (user:any)=>{
          this.loginservice.setUser(user);
 
        
          if(this.loginservice.getUserRole()=='ADMIN'){
            // admin
            this.router.navigate(['/admin'])
          }
          else if(this.loginservice.getUserRole()=='NORMAL')
          {
            //normal
            this.router.navigate(['/user-dashboard'])
          }
          else{
            this.loginservice.logOut();
          }
        }
       )
      },
      (error)=>{

        this.snack.open('invalid details','',{
          duration:3000
        })
      }
     );
  }
}
 