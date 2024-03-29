import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qid: any;
  qtitle: any;
  questions: any;
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
  ) { }

  ngOnInit(): void {
    //get question by quiz id method
    this.qid = this._route.snapshot.params['qid'];
    this.qtitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qid).subscribe((data: any) => {
      console.log(data)
      this.questions = data
    },
      (error: any) => {
        console.log(error)
      });


  }

  //Delete Question Function
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        this._question.deleteQuestion(qid).subscribe((data) => {

          this.questions = this.questions.filter((q:any) => q.quesId != qid)
          Swal.fire('Success', 'Quiz Deleted Successfully', 'success')
        },
          (error) => {
            Swal.fire("Error !!", "Error in Quiz Delete ", 'error')
          });
      }
    })

  }

}


