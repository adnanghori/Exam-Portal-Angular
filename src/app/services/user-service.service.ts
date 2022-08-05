import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(private httpClient:HttpClient) { }
  // add user

  public addUser(user:any){
      return this.httpClient.post(`${baseURL}/user/`,user)
  }
  public getInfo(userName:any){
    return this.httpClient.get(`${baseURL}/user/`,userName)
  }
}

 