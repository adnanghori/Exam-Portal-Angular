import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';




@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  qid:any;
  questions:any=[]
  marksGot=0;
  correctAnswer=0;
  attemptedQuestions=0;
  quizTitle:any=undefined;
  mark = 0;
  isSubmit = true;
  user:any = null;
  timer:any;

  constructor(private activatedRoute:ActivatedRoute,private questionService:QuestionService,private locationStrategy:LocationStrategy,private snack:MatSnackBar,private router:Router,private loginService:LoginService) { }

  ngOnInit(): void {
    this.qid=this.activatedRoute.snapshot.params['qid']
    this.prevent()
    this.loadQuestion()
  }
  prevent(){
    history.pushState(null,"null",location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,"null",location.href)
    });
    document.addEventListener('contextmenu', event => event.preventDefault());
    window.onload = function () {  
      document.onkeydown = function (e) {  
          return (e.which || e.keyCode) != 116;  
      };  
  }  
  }
  public loadQuestion(){
    this.questionService.getQuestionsOfActiveQuiz(this.qid).subscribe(
      (data)=>{
        this.questions = data;
        this.timer = this.questions.length*2*60;
        // this.mark = this.questions[0].quiz.maxMarks/this.questions.length; // for client side
        this.quizTitle=this.questions[0].quiz.quizTitle;
        //for client side validation
        // this.questions.forEach((element: { [x: string]: string; }) => {
        //   element['givenAnswer'] = '';
        // });
        this.startTimer()
      },
      (error)=>{
        this.snack.open('Error','Ok',{
          duration:3000
        })
        this.router.navigate(['/user-dashboard/load-quiz/'])
      }
    )
  }
  // for client side validation
  // public submitQuiz(){
  //   this.isSubmit = false;
  //   this.questions.forEach((element: { [x: string]: string; }) => {
  //       if(element['givenAnswer']==element['questionAnswer']){
  //         this.correctAnswer++; 
  //       }
        
  //       if(element['givenAnswer'].trim()!=''){
  //         this.attemptedQuestions++;
  //       }
  //   });
  //   this.marksGot = this.mark*this.correctAnswer;


  //  this.user =  this.loginService.getUser();
  //   this.user.attemptedQuiz++;
  //   this.loginService.updateUser(this.user).subscribe(
  //     (data)=>{

  //       localStorage.removeItem('user');
  //       this.loginService.setUser(this.user)
  //     },
  //     (error)=>{
        
  //     }
  //   )
  // }
  // for server side validation
  public submitQuiz(){
    this.isSubmit = false;
    this.questionService.evaluateQuiz(this.questions).subscribe(
      (data:any)=>{

        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer = data.correctAnswer;
        this.attemptedQuestions = data.attemptedQuestions;
        this.user =  this.loginService.getUser();
      this.user.attemptedQuiz++;
      this.loginService.updateUser(this.user).subscribe(
      (data)=>{
        localStorage.removeItem('user');
        this.loginService.setUser(this.user)
      },
      (error)=>{
      }
    )
      },
      (error)=>{

          this.snack.open('Error','OK',{
            duration:3000
          })
        
      }
    )
  }
  startTimer(){
   let t =  window.setInterval(()=>{
      if(this.timer<=0){
        this.submitQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }
  getFormattedTime(){
    let mm = Math.floor(this.timer/60)
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }
  printPage(){
    window.print();
  }

  
}
