import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  public users : any;
  // users = null;

  constructor(private login: LoginService) { }
  ngOnInit(): void {
    //back-end to front-END
    //LocalStorage mathi data lavse
    console.log(this.login.getUser());
    this.users = this.login.getUser();

    //Get user from Server
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.users = this.users;
    //   },
    //   (error) => {
    //     alert('error');
    //   }

    // );

  }

}
