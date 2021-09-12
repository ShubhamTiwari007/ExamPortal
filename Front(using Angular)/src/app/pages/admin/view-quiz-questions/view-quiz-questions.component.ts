import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions = [];

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params.qid;
    this.qTitle = this.route.snapshot.params.title;

    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data
      },
      (error) => {
        console.log(error)
      });

  }

  deleteQuestion(quesId) {

    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(quesId).subscribe(
          (data) => {
            Swal.fire("Success", "Question Deleted", "success")
            this.ngOnInit();
            // this.questions = this.questions.filter((q) => q.quesId != this.qId)
          },
          (error) => {
            this.snack.open('Error in deleting the question', '', { duration: 3000 });
            console.log(error);
          });
      }
    })
  }

}
