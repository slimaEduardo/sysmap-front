import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { Page } from "app/models/page";
import { TravelMap, TravelMapNew } from "app/models/travel-map.model";
import { Observable } from "rxjs";

@Injectable()
export class TravelMapService{
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/maps/${id}`,
    {
      observe: 'response',
      responseType: 'text'
    });
    
  }

  update(id: number, aux: TravelMapNew) {
    
    console.log(aux)
    return this.http.put(`${API_CONFIG.baseUrl}/maps/${id}`, aux,
    {
      observe: 'response',
      responseType: 'text'
    });
    
  }

  findById(id: number) {
    return this.http.get<TravelMap>(`${API_CONFIG.baseUrl}/maps/${id}`);
  }
    
    constructor(public http: HttpClient){}

    public getMaps(): Observable<TravelMap[]>{
    return this.http.get<TravelMap[]>(`${API_CONFIG.baseUrl}/maps`)
}  

public insert(obj: TravelMapNew){
  
  console.log(obj)
    return this.http.post(`${API_CONFIG.baseUrl}/maps`,obj,
    {
      observe: 'response',
      responseType: 'text'
    });
  }

  public listCategories(){
    return this.http.get(`${API_CONFIG.baseUrl}/categories`)
      .toPromise()
      .then((response: any) => {  
        return response
          
      })
  }

}