import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseURL}/current-user`);
  }
  public generateToken(loginData:any){
    return this.http.post(`${baseURL}/generate-token`,loginData); 
  }
  
  // login user set token in localstorage
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  // user is logged in or not
  public isLoggedIn(){
    let tokenString = localStorage.getItem("token");
    if(tokenString==undefined||tokenString==''||tokenString==null) return false;
    else return true;
  }
    // removes token from local storage
  public logOut(){
    localStorage.removeItem('token');
    localStorage.clear();
    return true;
  }
  public getTokenFromLocalStorage(){
    return localStorage.getItem('token');
  }
  // set user details

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  public getUser(){
    let userString = localStorage.getItem('user');
    if(userString!=null) return JSON.parse(userString)
    else {
      this.logOut();
      return null;
    }
  }
  public getUserRole(){
    let user = this.getUser();
    if(user.authorities[0]==''||user.authorities[0]==null||user.authorities[0]==undefined){
      return user.authorities[0]='NORMAL'
    }
    else{
      return user.authorities[0].authority; 
    }
    
  }
  public updateUser(user:any){
    return this.http.put(`${baseURL}/user/`,user)
  }
}
