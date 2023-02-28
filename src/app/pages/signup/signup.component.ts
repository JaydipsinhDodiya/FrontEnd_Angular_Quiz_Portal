import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //Autowired 
  constructor(private userService:UserService, private snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  
  };

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username == null){
      // alert('User Name is Required !!')
      this.snack.open('User Name is Required !!', '',{
        duration:2500,
      })
      return;
    }

    //Validation 
   // 'username': new FormControl(null, Validators.required),

    //addUser : userService connection
    this.userService.addUser(this.user).subscribe(
        (data: any) => {
          //success
          console.log(data);
          // alert('success');
          Swal.fire('Successfully Done', 'User id is '+ data.id ,'success') //this is sweet alert msg
        },
        (error) => {
          //error 
          console.log(error);
          // alert('Something went Wrong!!');
          this.snack.open('Something went Wrong!!', '',{ //this is snakebar alert msg
            duration:2500,
          })
        }
    );

  }


}
