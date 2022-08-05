import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  cid = undefined;
  quiz:any=[]

  
  constructor(private quizService:QuizService,private activatedRoute:ActivatedRoute,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    // this.cid = this.activatedRoute.snapshot.params['cid'] 
      this.activatedRoute.params.subscribe((params)=>{
        this.cid = params['cid'];
        if(this.cid==undefined){

      
          // load all
          this.quizService.getActiveQuiz().subscribe(
            (data)=>{
              this.quiz=data;

            },
            (error)=>{
              this.snack.open('Error','OK',{
                duration:3000
              })
            }
          )
        }
        else{
          // load specific

          this.quizService.getQuizByCategoryId(this.cid).subscribe(
            (data)=>{
              this.quiz =data;
              this.cid = undefined
              
              
            },
            (error)=>{
              this.snack.open('Error','OK',{
                duration:3000
              })
              
            }
          )
        }
    })
    
  }

}
