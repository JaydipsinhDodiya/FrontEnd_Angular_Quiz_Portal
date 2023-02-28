import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }

 //Admin //get questions by quiz id
  public getQuestionsOfQuiz(qid: any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
//Student // Get Questions for Quiz id
  public getQuestionsOfQuizForTest(qid: any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //add a question
  public addQuestion(question: any){
    return this._http.post(`${baseUrl}/question/`, question)

  }

  //Delete Question
  public deleteQuestion(questionId: any){
    return this._http.delete(`${baseUrl}/question/${questionId}`)
  }

  //eval Quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions)
  }
}
