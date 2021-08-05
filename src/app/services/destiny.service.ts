import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { Destiny, DestinyNew } from "app/models/destiny.model";
import { Page } from "app/models/page";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'


@Injectable()
export class DestinyService{
  listActivesCategories() {
    return this.http.get(`${API_CONFIG.baseUrl}/lines/active`)
      .toPromise()
      .then((response: any) => {  
        return response
          
      })
  }
  

  listByname(name: any): Promise<Destiny[]>{
    return this.http.get(`${API_CONFIG.baseUrl}/destinies/search?term=${name}`)
    .toPromise()
    .then((response: Destiny[]) => response)
  }
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/destinies/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
    
  }

  update(id: number, aux: DestinyNew) {
    aux.name = aux.name.toUpperCase()
    console.log(aux)
    return this.http.put(`${API_CONFIG.baseUrl}/destinies/${id}`, aux,{
      observe: 'response',
      responseType: 'json'
    })
    
  }

  updateStatus(id: number, destiny: Destiny) {
    return this.http.put(`${API_CONFIG.baseUrl}/destinies/s/${id}`, destiny,{
      observe: 'response',
      responseType: 'json'
    })
    
  }

  findById(id: number) {
    return this.http.get<Destiny>(`${API_CONFIG.baseUrl}/destinies/${id}`);
  }
    
    constructor(public http: HttpClient){}

    public getDestinies(): Observable<Destiny[]>{
    return this.http.get<Destiny[]>(`${API_CONFIG.baseUrl}/destinies`)
}  

public insert(obj: Destiny){
  obj.name = obj.name.toUpperCase()
  console.log(obj)
    return this.http.post(`${API_CONFIG.baseUrl}/destinies`,obj,
    {
      observe: 'response',
      responseType: 'text'
    });
  }

  public listCategories(){
    return this.http.get(`${API_CONFIG.baseUrl}/lines`)
      .toPromise()
      .then((response: any) => {  
        return response
          
      })
  }

}