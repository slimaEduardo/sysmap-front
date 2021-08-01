import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { TypeLine } from "app/models/destiny.model";
import { Observable } from "rxjs";

@Injectable()
export class LineCategoryService{

    listCategories() {
        return this.http.get(`${API_CONFIG.baseUrl}/lines`)
        .toPromise()
        .then((response: any) => {  
        return response
            
        })
}


  listByname(name: string): Promise<TypeLine[]>{
    return this.http.get(`${API_CONFIG.baseUrl}/lines/search?term=${name}`)
    .toPromise()
    .then((response: TypeLine[]) => response)
  }
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/lines/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
    
  }

  update(id: number, aux: TypeLine) {
    aux.name = aux.name.toUpperCase()
    return this.http.put(`${API_CONFIG.baseUrl}/lines/${id}`, aux,{
      observe: 'response',
      responseType: 'json'
    });
  }

  findById(id: number) {
    return this.http.get<TypeLine>(`${API_CONFIG.baseUrl}/lines/${id}`);
  }
    
    constructor(public http: HttpClient){}

    public getCompanies(): Observable<TypeLine[]>{
    return this.http.get<TypeLine[]>(`${API_CONFIG.baseUrl}/lines`)
}  

public insert(obj: TypeLine){
  obj.name = obj.name.toUpperCase()
    return this.http.post(`${API_CONFIG.baseUrl}/lines`,obj,
    {
      observe: 'response',
      responseType: 'json'
    });
  }

}