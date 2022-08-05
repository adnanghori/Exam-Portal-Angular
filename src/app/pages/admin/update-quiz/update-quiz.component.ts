import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  qid:any=undefined;
  constructor(private activatedRoute:ActivatedRoute,private quizService:QuizService,private snack:MatSnackBar,private categoryServie:CategoryService) { }
  quiz:any={
    qid:this.qid,
    quizTitle:'',
    quizDescription:'',
    maxMarks:'',
    numberOfQuestion:'',
    isActive:false,
    category:{
      cid:'',
    }
  }
  category:any=[]
  ngOnInit(): void {

      this.qid= this.activatedRoute.snapshot.params['qid'];
    this.quizService.getQuiz(this.qid).subscribe(
      (data)=>{

        this.quiz=data;
      },
      (error)=>{
        this.snack.open('Error','Ok',{
          duration:3000
        })
      }
    )
    this.categoryServie.getCategories().subscribe(
      (data:any)=>{
        this.category=data;
      }
    )
  }
  public updateQuiz(){
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
        this.snack.open('Updated','Ok',{
          duration:3000
        })
      },
      (error)=>{
        this.snack.open('Error','Ok',{
          duration:3000
        })
      }
    )
  }

}
