import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { Company } from "app/models/company.model";
import { Page } from "app/models/page";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'


@Injectable()
export class CompanyService{
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/companies/${id}`)
    .subscribe(response => {
      
    })
  }

  update(id: number, aux: Company) {
    return this.http.put(`${API_CONFIG.baseUrl}/companies/${id}`, aux)
    .subscribe(response => {
     }, error => {console.log(error)})
  }

  findById(id: number) {
    return this.http.get<Company>(`${API_CONFIG.baseUrl}/companies/${id}`);
  }
    
    constructor(public http: HttpClient){}

    public getCompanies(page: number, linesPerPage: number, orderBy: string): Observable<Page>{
    return this.http.get<Page>(`${API_CONFIG.baseUrl}/companies?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}`)
}  

public insert(obj: Company){
    return this.http.post(`${API_CONFIG.baseUrl}/companies`,obj,
    {
      observe: 'response',
      responseType: 'text'
    });
  }

}