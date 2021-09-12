import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`)
  }

  public addQuiz(quiz){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(qId){
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }

  public getQuiz(qid){
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  public updateQuiz(quiz){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  public getQuizzesOfCategory(cid){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`)
  }

  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`)
  }

  public getActiveQuizOfCategory(cid){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`)
  }
}
