import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //get current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }


  //generate token
  public generateToken(loginData) {
    return this.http.post(`${baseUrl}/generate-token`, loginData)
  }

  //set token in local storage
  public loginUser(token) {
    localStorage.setItem('token', token);
    return true;
  }

  //getToken
  public getToken() {
    // get the token
    return localStorage.getItem("token")
  }

  //user is logeed in or not
  public isLoggedIn() {
    let tokenStr = this.getToken();
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //logout: remove token from local storage
  public logout() {
    localStorage.removeItem("token")
    localStorage.clear()
    return true;
  }

  //set user detail
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user
  public getUser() {
    let userStr = localStorage.getItem("user")
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  //get user role/authority
  public getUserRole(){
    let user = this.getUser()
    return user.authorities[0].authority;
  }
}
