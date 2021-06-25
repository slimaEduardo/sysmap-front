import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  public errorMessage: string

  public formLogin: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  })

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  public authenticate(): void {
   this.auth.loginUser(this.formLogin.value)
   .subscribe(response => {
     //console.log(response.headers.get("Authorization"));
     this.auth.successfulLogin(response.headers.get('Authorization'));

  },
   error => {});
  }

}
