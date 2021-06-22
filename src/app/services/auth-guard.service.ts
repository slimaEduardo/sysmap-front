import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private auth: AuthService){}

    canActivate(): boolean {
        console.log(this.auth.authenticated())
        return this.auth.authenticated()
    }

}