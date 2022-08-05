import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  category:any=[]
   quiz={
    quizTitle:'',
    quizDescription:'',
    maxMarks:'',
    numberOfQuestion:'',
    isActive:false,
    category:{
      cid:'',
    }
    
  }
  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private quizService:QuizService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data)=>{
        this.category=data;
      },
      (error)=>{
        this.snack.open('error','ok',{
          duration:3000
        })
      }
    )
  }
  public addQuiz(){
    this.quizService.addQuiz(this.quiz).subscribe(
      (data)=>{
        this.snack.open('Posted','Ok',{
          duration:3000
        })
        this.quiz = {
          quizTitle:'',
          quizDescription:'',
          maxMarks:'',
          numberOfQuestion:'',
          isActive:false,
          category:{
            cid:'',
          }
          
        }
      },
      (error)=>{
        this.snack.open('error','Dismiss',{
          duration:3000
        })
      }
    )
  }
}
