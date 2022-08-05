import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {
  quizes:any=[];
  constructor(private quizService:QuizService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.quizService.quizes().subscribe(
      (data)=>{
        this.quizes=data;
      },
      (error)=>{
        this.snack.open('Error Occurred','ok',{
          duration:3000
        })
      } 
    )
  }
  public deleteQuiz(qid:any){

    this.quizService.deleteQuiz(qid).subscribe(
      (data)=>{

        this.snack.open('Quiz Deleted','Done',{
          duration:3000
        })
        this.ngOnInit()
      },
      (error)=>{
        this.snack.open('error','error',{
          duration:3000
        })
      }
    )
  }


}
