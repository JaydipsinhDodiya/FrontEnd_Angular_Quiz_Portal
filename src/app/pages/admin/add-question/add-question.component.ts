import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qid: any;
  qtitle: any;
  question = {
    quiz: {
      qid: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  constructor(private _route: ActivatedRoute,
    private _addQuestion: QuestionService) { }

  ngOnInit(): void {

    this.qid = this._route.snapshot.params['qid']
    this.qtitle = this._route.snapshot.params['title']
    this.question.quiz['qid'] = this.qid;
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {

      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {

      return;
    }

    if (this.question.option2.trim() == '' || this.question.option2 == null) {

      return;
    }

    if (this.question.option3.trim() == '' || this.question.option3 == null) {

      return;
    }

    if (this.question.option4.trim() == '' || this.question.option4 == null) {

      return;
    }

    if (this.question.answer.trim() == '' || this.question.answer == null) {

      return;
    }

    //Form Submit Code

    this._addQuestion.addQuestion(this.question).subscribe((data: any) => {
      Swal.fire('Success !!', 'Question is Added Successfully', 'success');
      //Submit thaya pachi data clear thai jai e page par thi etla mate use aa karay
      this.question.content=''
      this.question.answer=''
      this.question.option1=''
      this.question.option2=''
      this.question.option3=''
      this.question.option4=''
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error');
      }
    );

  }
}
