import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { Company } from "app/models/company.model";
import { Page } from "app/models/page";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'


@Injectable()
export class CompanyService{
    
    constructor(public http: HttpClient){}

    public getCompanies(page: number, linesPerPage: number): Observable<Page>{
    return this.http.get<Page>(`${API_CONFIG.baseUrl}/companies?page=${page}&linesPerPage=${linesPerPage}`)
}  
}