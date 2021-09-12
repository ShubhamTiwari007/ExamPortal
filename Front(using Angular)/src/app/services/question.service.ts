import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public addQuestion(question) {
    return this.http.post(`${baseUrl}/question/`, question);
  }

  public getQuestionsOfQuiz(qid) {
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }

  public updateQuestion(question) {
    return this.http.put(`${baseUrl}/question/`, question);
  }

  public getQuestion(quesId){
    return this.http.get(`${baseUrl}/question/${quesId}`)
  }

  public deleteQuestion(qid) {
    return this.http.delete(`${baseUrl}/question/${qid}`);
  }

  
  public getQuestionsOfQuizForTest(qid) {
    return this.http.get(`${baseUrl}/question/quiz/${qid}`)
  }

  public evalQuiz(questions){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions)
  }
}
