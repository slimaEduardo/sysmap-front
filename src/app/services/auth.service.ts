import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";



import { API_CONFIG } from "app/config/api.config";
import { LocalUser, UserLogin } from "app/models/user.model";
import { StorageService } from "./storage.service";



@Injectable()
export class AuthService{

    public token: string
    public localUser: LocalUser

    jwtHelperService: JwtHelperService  = new JwtHelperService ()

    constructor(public http: HttpClient, public storage: StorageService, private router: Router) {
    }

   
    loginUser(user: UserLogin){
       
        return this.http.post(`${API_CONFIG.baseUrl}/login`, user
        ,{
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
    this.token = authorizationValue.substring(7);
       this.localUser  = {
            token: this.token,
            userName: this.jwtHelperService.decodeToken(this.token).sub
                   
        };
       
        this.storage.setLocalUser(this.localUser)   
        localStorage.setItem('token',this.token)
       
        if(this.localUser.token !== undefined && this.localUser.token !==null){
            this.router.navigate(['travelMap'])
        }
    }

    logout() {
        this.storage.setLocalUser(null)   
        localStorage.setItem('token','undefined')
        this.token = undefined
        this.router.navigate(['login'])
    }

    public authenticated(): boolean{
       
        console.log('Token: ',this.token)
        if(this.token === undefined && localStorage.getItem('token') !== 'undefined'){
            
            this.token = localStorage.getItem('token')
        }
       
        if(this.token === undefined || this.token === null){
            console.log(this.token)
            this.router.navigate(['login']) 
        }
       
         return this.token !== undefined
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }
}  