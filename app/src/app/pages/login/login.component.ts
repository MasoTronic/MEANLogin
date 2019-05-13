import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor( private formBuilder: FormBuilder,private auth:AuthService,   private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.auth.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)

        .subscribe(
            data => {
              console.log(data);
                if(data.data === 'none')
                {
                  alert('User does not exist')
                }
                else if(data.data === 'wrong password')
                {
                  alert('incorrect password!')

                }
                else if(data.data.email)
                {
              console.log(data.data['email']);

              localStorage.setItem('authToken','true');
              localStorage.setItem('user', JSON.stringify(data.data));
              console.log('return' + data);
                this.router.navigate(['/home']);
                }
            },
            error => {
               console.log(error);
                this.loading = false;
            });
}
}
