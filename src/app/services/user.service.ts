import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { User, UserNew } from "app/models/user.model";

@Injectable()
export class UserService{
    
   
    
    constructor(public http: HttpClient){}

    public listUsers(){
        return this.http.get(`${API_CONFIG.baseUrl}/users`)
    }

    public insert(obj: UserNew){
        console.log(obj)
        return this.http.post(`${API_CONFIG.baseUrl}/users`,obj,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    findById(id: number) {
        return this.http.get<User>(`${API_CONFIG.baseUrl}/users/${id}`);
    }

    delete(id: any) {
        return this.http.delete(`${API_CONFIG.baseUrl}/users/${id}`,
        {
        observe: 'response',
        responseType: 'text'
        });
    }

    update(id: any, aux: UserNew) {
        return this.http.put(`${API_CONFIG.baseUrl}/users/${id}`, aux,
    {
      observe: 'response',
      responseType: 'text'
    });
      }
}