import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {
  qid:any=undefined;
  quiz:any=[];
  question:any=[]
  constructor(private activateRoute:ActivatedRoute,private quizService:QuizService,private questionService:QuestionService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qid=this.activateRoute.snapshot.params['qid']
    this.quizService.getQuiz(this.qid).subscribe(
      (data)=>{
        this.quiz=data;
      }
    )
      this.questionService.getQuestionsOfQuiz(this.qid).subscribe(
        (data)=>{
          this.question=data;
        },
        (error)=>{
          this.snack.open('Error','Ok',{
            duration:3000
          })
        }
      )
  } 
  public deleteQuestion(questionId:any){
    this.questionService.deleteQuestion(questionId).subscribe(
      (data)=>{
        this.snack.open('Deleted','Ok',{
          duration:3000
        })
        this.ngOnInit()
      },
      (error)=>{
        this.snack.open('Error','Ok',{
          duration:3000
        })
      }
    )
  }
  
}
