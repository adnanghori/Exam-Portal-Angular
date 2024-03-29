import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any =null;
  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(
    (data)=>{
      this.user=data;
    },
    (error)=>{

    }
    )
  }
}
