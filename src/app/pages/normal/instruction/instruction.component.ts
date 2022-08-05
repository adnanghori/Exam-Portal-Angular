import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
qid:any;
quiz:any=[]

  constructor(private quizService:QuizService,private activatedRoute:ActivatedRoute,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qid=this.activatedRoute.snapshot.params['qid']
    this.quizService.getActiveQuizById(this.qid).subscribe(
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

}
