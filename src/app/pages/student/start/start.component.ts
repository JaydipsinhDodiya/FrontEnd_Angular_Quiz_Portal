import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid : any;
  questions:any;
  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  warningCount=0;
  constructor(private locationSt:LocationStrategy,
              private _route:ActivatedRoute,
              private _question:QuestionService,
              private snakebar:MatSnackBar,
              private route:Router) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid)
    this.loadQuestions();
  }
  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;
        console.log(data)
        this.timer=this.questions.length*2*60;
        this.questions.forEach((q:any)=>{
          q['givenAnswer']='';
        });
        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error in loading questions of quizz');
      }
    );
  }

  preventBackButton(){
    history.pushState(null,"'null'",location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,"'null'",location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText:`Submit`,

      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
    });
  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
    }else{
      this.timer--;
    }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer- mm*60;
    return `${mm} min: ${ss} sec`;
  }

  evalQuiz(){
    //calculation
    //call to server to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer=data.correctAnswer;
        this.attempted=data.attempted;
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
      }
    )
   // this.isSubmit=true;
    //this.questions.forEach(q=>{
      //if(q.givenAnswer==q.answer){
       // this.correctAnswers++;
       // let marksSingle=this.questions[0].quiz.marks/this.questions.length;
       // this.marksGot+=marksSingle;
     // }
     // if(q.givenAnswer.trim()!=''){
      //  this.attempted++;
      //}

   // });
    //console.log("correct ans: "+this.correctAnswers);
    //console.log("marks got: "+this.marksGot);
    //console.log("attemted: "+this.attempted);
    //console.log(this.questions);
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick({event}: { event: any }) {
    Swal.fire("warning","You can't right click if u will do so your exam will be cancalled!!","warning");
    this.warningCount++;
    if(this.warningCount>5){
      console.log("warning count number is:"+this.warningCount);
      //this.submitQuiz();
      Swal.fire("warning","This is your last warning now your exam gets automatically submitted!!","warning");
      this.logout();
    }
    event.preventDefault();
  }

  logout(){
    //this.loginService.logout();
    window.location.href='/login';
    this.route.navigate(['login']);
    this.snakebar.open("you have logged out due to max warnings","ok",{duration:3000});
  }


  printPage(){
    window.print();
  }
}
