import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  constructor( private formBuilder: FormBuilder, private router: Router,private auth:AuthService) { }

  ngOnInit() {
  this.userForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['',[Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
}

onSubmit(){
  if(this.userForm.valid){

    this.auth.create({
      "name":this.userForm.controls.firstName.value,
      "surname":this.userForm.controls.lastName.value,
      "email":this.userForm.controls.email.value,
      "password": this.userForm.controls.password.value
      }).subscribe(res =>{
        localStorage.setItem('user', JSON.stringify(res.data.data));
      console.log(res.tokens[0].token)
    })
  } else {
    alert('User form is not valid!!')
  }
}

}
