import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserService]
})
export class UserProfileComponent implements OnInit {

  public users: User[]

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.listUsers()
  }

  public listUsers(){
    this.userService.listUsers()
    .subscribe((response: any) => {
      this.users = response
    })
  }
}
