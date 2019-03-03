import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Observer, of } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }


  logIn(email: string, password: string) {
    return this.http.get(environment.serverUrl + `users?email=${email}&password=${password}`).pipe(
      switchMap((data: Array<any>) => new Observable((observer: Observer<User>) => {
        // If success
        if (data.length) {
          // TODO: Save to the localstorage
          const user = this.createUser(data[0]);
          this.storage.set('user', user);
          // Return to subscriber
          observer.next(user);
          observer.complete();
        // Error
        } else {
          observer.error('Email or password are not valid');
        }
      }))
    );
  }

  logOut() {
    this.storage.remove('user');
  }

  isLoggedIn() {
    if (this.storage.get('user')) {
      return true;
    }
  }

  register(user: User) {
    // Temporary check of existing name in db. Delete when create separate rest server
    return this.http.get(environment.serverUrl + `users?email=${user.email.toLowerCase()}`).pipe(
      switchMap((data: Array<any>) => {
        if (data.length > 0) {
          return new Observable((observer) => observer.error('Email is already exist'));
        }

        // The only string that should be in the function at all (mb with some check of http error code, via pipe)
        return this.http.post(environment.serverUrl + 'users', user);
      })
    );
  }

  createUser(obj: any) {
    return new User(
      obj.email,
      obj.password,
      obj.name
    );
  }
}
