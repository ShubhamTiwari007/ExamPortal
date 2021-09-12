import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  };

  constructor(private snack: MatSnackBar, private login: LoginService, private router : Router) {
    //
  }

  ngOnInit() {
    //
    localStorage.clear();
  }

  formSubmit() {

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required !! ', '', { duration: 3000 });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required !! ', '', { duration: 3000 });
      return;
    }

    //request to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success" + data)
        //login...
        //saving the token
        this.login.loginUser(data.token);
        //get current user info using token
        this.login.getCurrentUser().subscribe(
          (data) => {
            this.login.setUser(data)
            console.log(data);
            //redirect to ... ADMIN or NORMAL
            if (this.login.getUserRole() == "ADMIN") {
              //admin dashboard
              // window.location.href="/admin"
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == "NORMAL") {
              //user dashboard
              // window.location.href="/user-dashboard"
              this.router.navigate(['user-dashboard/0'])
              this.login.loginStatusSubject.next(true);
            } else {
              //logout
              this.login.logout();
            }
          },
          (error) => {
            console.log('error: ' + error);
          })
      },
      (error) => {
        console.log("error" + error)
        this.snack.open("Invalid details, try again!!", '', { duration: 3000 });
      });
  }

}
