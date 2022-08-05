import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private questionService:QuestionService,private snack:MatSnackBar) { }
  questionId = undefined;
  quizTitle=undefined;
  question:any=[]
  ngOnInit(): void {
    this.quizTitle=this.activatedRoute.snapshot.params['quizTitle']
    this.questionId=this.activatedRoute.snapshot.params['questionId']
    this.questionService.getQuestion(this.questionId).subscribe(
      (data)=>{
        this.question = data;
      }
    )
  }
  public updateQuestion(){
    this.questionService.updateQuestion(this.question).subscribe(
      (data)=>{
        this.snack.open('Updated','Ok',{
          duration:3000
        })
      },
      (error)=>{
        this.snack.open('Error','ok',{
          duration:3000
        })
      }
    )
  }
}
