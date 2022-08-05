import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

    public getCategories(){
      return this.http.get(`${baseURL}/category/`);
    }
    public addCategory(category:any){

        return this.http.post(`${baseURL}/category/`,category);
    }
}
