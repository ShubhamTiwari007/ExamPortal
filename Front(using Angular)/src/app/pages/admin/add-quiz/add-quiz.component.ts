import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from  'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = []

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: null
  }

  constructor(private categoryService: CategoryService, private snack: MatSnackBar, private quizService : QuizService) {
    //
  }

  ngOnInit() {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data
        console.log(this.categories)
      },
      (error) => {
        console.log(error)
      })
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snack.open('Title Required !!', '', { duration: 3000 })
      return
    }

    this.quizService.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz is added','success')
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: null
        }
      },
      (error)=>{
        Swal.fire('Error','Error while adding quiz','error')
        console.log(error)        
      }
    )

  }

}
