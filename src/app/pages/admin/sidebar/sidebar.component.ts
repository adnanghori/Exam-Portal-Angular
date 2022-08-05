import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService:LoginService,private snack:MatSnackBar,private route:Router) { }

  ngOnInit(): void {
  }
  public logout(){
    this.loginService.logOut();
    this.snack.open('Logged Out','Ok',{
      duration:3000
    })
    this.route.navigate(['/login'])
  }
}
