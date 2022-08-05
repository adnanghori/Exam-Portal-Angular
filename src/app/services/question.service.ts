import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this.http.get(`${baseURL}/question/quiz/${qid}`)
  }
  public addQuestion(question:any){
    return this.http.post(`${baseURL}/question/`,question)
  }
  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseURL}/question/${questionId}`)
  }
  public getQuestion(questionId:any){
    return this.http.get(`${baseURL}/question/${questionId}`)
  }
  public updateQuestion(question:any){
    return this.http.put(`${baseURL}/question/`,question)
  }
  public getQuestionsOfActiveQuiz(qid:any){
    return this.http.get(`${baseURL}/question/active-quiz/${qid}`)
  }
  public evaluateQuiz(questions:any){
    return this.http.post(`${baseURL}/question/evaluate-quiz`,questions)
  }
}
