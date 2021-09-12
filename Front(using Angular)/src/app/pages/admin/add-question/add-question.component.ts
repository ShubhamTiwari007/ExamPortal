import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId;
  qTitle;
  question = {
    quiz: { },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }


  constructor(private route: ActivatedRoute, private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params.qid;
    this.qTitle = this.route.snapshot.params.title;
    this.question.quiz['qId'] = this.qId
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null)
      return;

    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire("Success","Question Added","success").then(
          (e)=>{
            this.router.navigate([`/admin/view-questions/${this.qId}/${this.qTitle}`]);
          }
        )
        console.log(data)
      },
      (error) => {
        Swal.fire("Error","Error in adding question","error")
        console.log(error)
      }
    )
  }

}
