import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId;
  questions: any = [{
    quiz: {}
  }]
  marksGot = 0
  correctAnswers = 0
  attempted = 0
  isSubmit = false
  timer: any;

  constructor(private route: ActivatedRoute, private locationStartegy: LocationStrategy, private questionService: QuestionService) { }

  ngOnInit() {

    this.qId = this.route.snapshot.params.qid;
    this.loadQuestions();
    this.preventBackButton()
    //resetting the marks
    this.marksGot = 0
    this.correctAnswers = 0
    this.attempted = 0

  }

  loadQuestions() {
    this.questionService.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data: any) => {
        this.questions = data
        console.log(this.questions);
        
        this.timer = this.questions.length * 1.5 * 60
        this.startTimer()
      },
      (error) => {
        console.log(error);
      });
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStartegy.onPopState(() => {
      history.pushState(null, null, location.href)
    })
  }

  evalQuiz() {
    //server calling
    this.questionService.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.attempted = data.attempted
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2))
        this.correctAnswers = data.correctAnswers
        this.isSubmit = true
      },
      (error) => {
        console.log(error);
      });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz()
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz()
        clearInterval(t)
      }
      else
        this.timer--;
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60)
    let ss = this.timer - mm * 60
    return `${mm} min : ${ss} sec`
  }

  printPage(){
    window.print()
  }

}
