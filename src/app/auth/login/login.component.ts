import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required
      ],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required
      ],
    })
  });

  loggingError: string;

  justRegistered: boolean;


  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Show message if user is just registered
    this.justRegistered = Boolean(this.route.snapshot.paramMap.get('registered'));
    // And remove it after some time
    timer(5000).subscribe(_ => this.justRegistered = false);
  }


  logIn() {
    this.auth.logIn(this.username.value, this.password.value).subscribe((user: User) => {
      // TODO: Redirect?
      this.loggingError = null;
      console.log(user);
    }, (error: string) => {
      // Show an error on the frontend
      this.loggingError = error;
      console.log(error);
    });
  }

  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }

}
