import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
        // Validators.pattern(/^\w[\w\d_-]*@\w[\w\d_-]*(?:\.\w[\w\d_-]*)+$/)
      ],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6)
      ],
    }),
    name: new FormControl('', {
      validators: [
        Validators.required
      ],
    }),
    agreement: new FormControl(false, {
      validators: [
        Validators.pattern('true')
      ],
    })
  });

  validOnce: any = {};

  loggingError: string;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    of('username', 'password', 'name').pipe(
      mergeMap(x => this.userForm.get(x).statusChanges.pipe(
        map(status => ({field: x, status: status}))
      ))
    ).subscribe(x => this.validOnce[x.field] = this.validOnce[x.field] ? this.validOnce[x.field] : x.status === 'VALID');
  }


  register() {
    this.auth.register(new User(this.username.value, this.password.value, this.name.value)).subscribe(data => {
      // TODO: Is db sending http error when object is already exist?
      // Workaround to show 'login' in the url bar, but to not show data passed (skipLocationChange)
      window.history.pushState('', '', '/login');
      // Redirect to the login page with data passing
      this.router.navigate(['/login', {registered: true}], {skipLocationChange: true});
    }, error => {
      console.log(error);
      // TODO: Show error
    });
  }


  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get name() { return this.userForm.get('name'); }
  get agreement() { return this.userForm.get('agreement'); }

}
