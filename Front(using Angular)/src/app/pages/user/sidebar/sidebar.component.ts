import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories

  constructor(private categoryService : CategoryService, private snack : MatSnackBar) { }

  ngOnInit() {
    this.categoryService.categories().subscribe(
      (data)=>{
        this.categories = data
      },
      (error)=>{
        this.snack.open('Error in loading categories','',{duration:3000})
      });
  }


}
