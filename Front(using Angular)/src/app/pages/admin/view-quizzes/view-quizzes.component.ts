import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { QuizService } from './../../../services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = []

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data
      },
      (error) => {
        Swal.fire("Error!!", "Error in loading data", "error")
        console.log(error)

      }
    )
  }

  deleteQuiz(qId) {

    Swal.fire({
      icon: 'info',
      title: "Are You Sure ?",
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qId).subscribe(
          (data) => {
            Swal.fire("Success", "Quiz Deleted", "success")

            //filter the quiz to update
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId)

            /* this.ngOnInit(); calling the onInit() to reload component */
          },
          (error) => {
            Swal.fire("Error!!", "Error in deleting quiz", "error")
          }
        )
      }
    })
  }


}
