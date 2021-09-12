import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from './../../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack : MatSnackBar, private router: Router) {
    //this is constructor
   }

  public user = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  ngOnInit() {
    //this get intialized on page load
  }

  formSubmit(){
    if(this.user.username == '' || this.user.username == null)
    {
      this.snack.open('Username is required !!','',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition: 'right'
      })   
      
      return
    }

    //addUser function
    this.userService.addUser(this.user).subscribe(
      (data: any) =>{
        //success
        console.log(data);
        Swal.fire('Success','User id is ' + data.id, 'success');
        this.router.navigate(['login'])
      },
      (error)=>{
        //error
        console.log(error);
        Swal.fire('Error',error.error.message, 'error');
        this.user = {
          username:'',
          password:'',
          firstName:'',
          lastName:'',
          email:'',
          phone:''
        }
      }
    )
  }

}
