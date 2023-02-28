import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prequiz',
  templateUrl: './prequiz.component.html',
  styleUrls: ['./prequiz.component.css']
})
export class PrequizComponent implements OnInit {

  qid: any;
  quiz: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
  ) { }

  ngOnInit(): void {

    this.qid = this._route.snapshot.params['qid'];

    //console.log(this.qid)
    this._quiz.getQuiz(this.qid).subscribe(
      (data) => {
        //console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        alert("Error in loading Data")
      }
    );
  }
  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: `Start`,
      denyButtonText: `Don't save`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })  

  }

}
