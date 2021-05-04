import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { BusCategory } from "app/models/travel-map.model";

@Injectable()
export class BusCategoryService{


  
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/categories/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
    
  }

  update(id: number, aux: BusCategory) {
    aux.name = aux.name.toUpperCase()
    return this.http.put(`${API_CONFIG.baseUrl}/categories/${id}`, aux,{
      observe: 'response',
      responseType: 'json'
    });
  }

  findById(id: number) {
    return this.http.get<BusCategory>(`${API_CONFIG.baseUrl}/categories/${id}`);
  }
    
    constructor(public http: HttpClient){}

public listCategories(){
        return this.http.get(`${API_CONFIG.baseUrl}/categories`)
          .toPromise()
          .then((response: any) => {  
            return response
              
          })
}

public insert(obj: BusCategory){
  obj.name = obj.name.toUpperCase()
    return this.http.post(`${API_CONFIG.baseUrl}/categories`,obj,
    {
      observe: 'response',
      responseType: 'json'
    });
  }

}