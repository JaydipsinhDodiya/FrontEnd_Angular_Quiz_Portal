import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  //categories fetch karava mate
  categories = [
    {
      cid: 23,
      title: 'programming',
      description: 'this is category',
    },
  ];

  //Add Quiz karava mate blank rakhyu che
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',

    },
  };

  //Add Quiz ma Category add  
  //Already categoryService is created in View all Categories
  constructor(private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data: any) => {
      //css
      this.categories = data;
      console.log(this.categories);

    },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loadig data ", 'error')
      }
    );
  }

  //Add Quiz Function on submit 

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open("Title Required !!", '', {
        duration: 3000
      });
      return;
    }

    //Validation incomplete from add-quiz-form


    //call server
    this._quiz.addQuiz(this.quizData).subscribe((data) => {
      Swal.fire('Success !!', 'Quiz is Added is Successfully', 'success');
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category: {
          cid: '',

        },
      };
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error');
        console.log(error)
      }
    );
  }

}
