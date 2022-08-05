import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qid=undefined
  question:any={
    questionContent:'',
    questionImage:'default.png',
    option_1:'',
    option_2:'',
    option_3:'',
    option_4:'',
    questionAnswer:'',
    quiz:{
      qid:''
    }
  }
  
  quiz:any=[]
  constructor(private activatedRoute:ActivatedRoute,private questionService:QuestionService,private snack:MatSnackBar,private quizService:QuizService) { }

  ngOnInit(): void {

   this.qid = this.activatedRoute.snapshot.params['qid']
   this.quizService.getQuiz(this.qid).subscribe(
    (data)=>{
      this.quiz =data;
    }
   )
  }
  public addQuestion(){
    this.question.quiz.qid=this.qid
    this.questionService.addQuestion(this.question).subscribe(
      (data)=>{
        this.snack.open('Added','Ok',{
          duration:3000
        })
        this.question={
          questionContent:'',
          questionImage:'default.png',
          option_1:'',
          option_2:'',
          option_3:'',
          option_4:'',
          questionAnswer:'',
          quiz:{
            qid:this.qid
          }
      
        }
      },

      (error)=>{
        this.snack.open('Error','Ok',{
          duration:3000
        })
      }
    )
  }
}
