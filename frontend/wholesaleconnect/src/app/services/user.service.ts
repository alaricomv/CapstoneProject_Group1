import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from '../shared/models/User'
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/urls';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  //Login for user
  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            'Welcome to WholeSalesConnect',
            'Login Succesful'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error, 'Login Failed' );
        }
      })
    );
  }

  //Sets the user in the local storage
  private setUserToLocalStorage(user:User){
    localStorage.setItem('User', JSON.stringify(user));
  }

  //Gets the user from the local storage, if there is no user it sends an empty user
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem('User');
    if(userJson){
      return JSON.parse(userJson) as User;
    }
    return new User();
  }

  //Register for user
  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next: (user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            'Welcome to WholeSalesConnect',
            'Register Succesful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed' );
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    window.location.reload();
  }
}
