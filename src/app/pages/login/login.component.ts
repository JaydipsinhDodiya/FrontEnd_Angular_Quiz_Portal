import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar,
     private login: LoginService,
     private router:Router,) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login Button Clicked");

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("UserName is Required!!", '', {
        duration: 3000,
      });
      return;

    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is Required!!", '', {
        duration: 3000,
      });
      return;
    }

    //Request to Server to generate Token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        //success
        console.log(data);

        //Login 

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);

            //redirect ... Admin : Admin - Dashboard
            //redirect ... Student : Student - Dashboard

            if (this.login.getUserRole() == 'Admin') {
              //Admin Dashboard
               window.location.href = '/admin';
              //this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true);
            
            }
            else if (this.login.getUserRole() == 'Student') {
              //Student-Dashboard
              window.location.href = '/student-dashboard/0';
              //this.router.navigate(['student-dashboard']);
              this.login.loginStatusSubject.next(true);

            }
            else {
              this.login.logout();
              location.reload();
            }
          }
        )
        // alert('success');
        Swal.fire('Login Successfully', ' ', 'success') //this is sweet alert msg
      },
      (error) => {
        //error 
        console.log(error);
        // alert('Something went Wrong!!');
        Swal.fire('Login Failed', ' ', 'error')

      }
    );

  }

}
