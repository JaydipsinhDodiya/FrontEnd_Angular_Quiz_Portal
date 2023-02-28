import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();  

  constructor(private http: HttpClient) { }

  //current user : which is logged In
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }


  //generate Token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user : set token in localStorage
  public loginUser(token:any) {
    localStorage.setItem('token', token);
    return true;
  }

  //isLogin : check User is login or Not
  public isLoggedIn() {
    let tokenstr = localStorage.getItem('token');
    if (tokenstr == undefined || tokenstr == '' || tokenstr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //Logout : remove token for localStorage
  public logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //Set User Detail
  public setUser(user:any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get User Detail
  public getUser() {
    let userStr = localStorage.getItem('user');
    {
      if(userStr!=null){
        return JSON.parse(userStr);
      }
      else{
        this.logout();
        return null;
      }
    }
  }

  //get User Role
  public getUserRole(){
    let user =  this.getUser()
    return user.authorities[0].authority; //only one role get which one is  0 index
    // return user.authorities //used show all roles 
  }

  
}
