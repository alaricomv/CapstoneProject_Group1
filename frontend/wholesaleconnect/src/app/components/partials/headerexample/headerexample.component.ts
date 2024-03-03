import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-headerexample',
  templateUrl: './headerexample.component.html',
  styleUrl: './headerexample.component.css'
})
export class HeaderexampleComponent {

  user!:User;

  constructor(private userService:UserService){
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }

  logout(){
    this.userService.logout();
  }

}
