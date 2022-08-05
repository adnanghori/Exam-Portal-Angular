import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  user:any;
  constructor(private activatedRoute:ActivatedRoute,private snak:MatSnackBar,private loginService:LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    
  }

}
