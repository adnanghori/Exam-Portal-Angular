import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public role:any;
  constructor(public loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  this.role= this.loginService.getUserRole();
  if(this.role=='ADMIN'){
    this.role=true;
  }
  else 
  {
    this.role=false;
  }
  }
  public logout(){
    this.loginService.logOut();
    this.router.navigate(['/login'])
  }
}
