import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  qId;
  qTitle;
  quesId;

  question: any;


  constructor(private route: ActivatedRoute, private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params.qid;
    this.qTitle = this.route.snapshot.params.title;
    this.quesId = this.route.snapshot.params.quesId;

    this.questionService.getQuestion(this.quesId).subscribe(
      (data) => {
        this.question = data
      },
      (error) => {
        console.log(error)
      });
  }

  public updateData() {

    this.questionService.updateQuestion(this.question).subscribe(
      (data) => {
        Swal.fire("Success!!", "Question Updated", "success").then(
          (e) => {
            this.router.navigate([`/admin/view-questions/${this.qId}/${this.qTitle}`])
          }
        )
      },
      (error) => {
        Swal.fire("Error!!", "Error in updating quiz", "error")
      }
    )

  }

}
