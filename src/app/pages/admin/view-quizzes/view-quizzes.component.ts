import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  // dummy data ..
  quizzes = [
    {
      qid: 23,
      title: 'Basic Java Quiz ',
      description: 'Java is an object-oriented programming language that produces software for multiple platforms',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Programming'
      }
    },
    {
      qid: 23,
      title: 'Basic Java Quiz ',
      description: 'Java is an object-oriented programming language that produces software for multiple platforms',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Programming'
      }
    },
  ];
  constructor(
    private _quiz: QuizService) { }

  ngOnInit(): void {

    //Get all Quiz Data
    this._quiz.quizzes().subscribe((data: any) => {
      //css
      this.quizzes = data;
      console.log(this.quizzes);

    },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loadig data ", 'error')
      }
    );

  }

  //Delete Quiz function
  deleteQuiz(qid: any) {

    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        this._quiz.deleteQuiz(qid).subscribe((data) => {

          this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid)
          Swal.fire('Success', 'Quiz Deleted Successfully', 'success')
        },
          (error) => {
            Swal.fire("Error !!", "Error in Quiz Delete ", 'error')
          });
      }
    })

  }

}
