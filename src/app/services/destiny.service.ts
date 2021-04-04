import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { Destiny, DestinyNew } from "app/models/destiny.model";
import { Page } from "app/models/page";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'


@Injectable()
export class DestinyService{

  listByname(name: any): Promise<Destiny[]>{
    return this.http.get(`${API_CONFIG.baseUrl}/destinies/search?therm=${name}`)
    .toPromise()
    .then((response: Destiny[]) => response)
  }
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/destinies/${id}`)
    .subscribe(response => {
      
    })
  }

  update(id: number, aux: DestinyNew) {
    aux.name = aux.name.toUpperCase()
    console.log(aux)
    return this.http.put(`${API_CONFIG.baseUrl}/destinies/${id}`, aux)
    .subscribe(response => {
     }, error => {console.log(error)})
  }

  findById(id: number) {
    return this.http.get<Destiny>(`${API_CONFIG.baseUrl}/destinies/${id}`);
  }
    
    constructor(public http: HttpClient){}

    public getCompanies(page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Page>{
    return this.http.get<Page>(`${API_CONFIG.baseUrl}/destinies?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`)
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