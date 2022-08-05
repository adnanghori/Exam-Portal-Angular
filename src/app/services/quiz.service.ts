import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  public quizes(){
    return this.http.get(`${baseURL}/quiz/`)
  }
  public addQuiz(quiz:any){

    return this.http.post(`${baseURL}/quiz/`,quiz)
  }
  public deleteQuiz(qid:any){
    return this.http.delete(`${baseURL}/quiz/${qid}`);
  }
  public getQuiz(qid:any){
    return this.http.get(`${baseURL}/quiz/${qid}`)
  }
  public updateQuiz(quiz:any){
    return this.http.put(`${baseURL}/quiz/`,quiz)
  }
  public getQuizByCategoryId(cid:any){
    return this.http.get(`${baseURL}/quiz/category/${cid}`);
  }
  public getActiveQuiz(){
    return this.http.get(`${baseURL}/quiz/active-quiz`);
  }
  public getActiveQuizById(qid:any){
    return this.http.get(`${baseURL}/quiz/active-quiz/${qid}`)
  }
}
