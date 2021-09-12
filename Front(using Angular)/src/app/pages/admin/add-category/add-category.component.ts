import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:''
  }

  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }

  ngOnInit() {
    //
  }

  formSubmit(){

    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open("Title Required!!",'',{
        duration:3000,})
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title="";
        this.category.description="";
        Swal.fire("Success!!","Category is added successfully","success")
        console.log(data)        
      },
      (error)=>{
        console.log(error)   
        Swal.fire("Error","Server Error","error")     
      })

  }
}