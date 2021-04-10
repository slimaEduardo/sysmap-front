import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { Company } from "app/models/company.model";
import { Page } from "app/models/page";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'


@Injectable()
export class CompanyService{


  listByname(name: string): Promise<Company[]>{
    return this.http.get(`${API_CONFIG.baseUrl}/companies/search?term=${name}`)
    .toPromise()
    .then((response: Company[]) => response)
  }
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/companies/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
    
  }

  update(id: number, aux: Company) {
    aux.name = aux.name.toUpperCase()
    return this.http.put(`${API_CONFIG.baseUrl}/companies/${id}`, aux,{
      observe: 'response',
      responseType: 'json'
    });
  }

  findById(id: number) {
    return this.http.get<Company>(`${API_CONFIG.baseUrl}/companies/${id}`);
  }
    
    constructor(public http: HttpClient){}

    public getCompanies(page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Page>{
    return this.http.get<Page>(`${API_CONFIG.baseUrl}/companies?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`)
}  

public insert(obj: Company){
  obj.name = obj.name.toUpperCase()
    return this.http.post(`${API_CONFIG.baseUrl}/companies`,obj,
    {
      observe: 'response',
      responseType: 'json'
    });
  }

}