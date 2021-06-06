import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable, TemplateRef } from "@angular/core";
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
    
    constructor(public http: HttpClient, private  datepipe: DatePipe){}

    public getMaps(){
      return this.http.get(`${API_CONFIG.baseUrl}/maps`)
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

  public listMapsPeriod(start: Date, end: Date){
    let _start = this.datepipe.transform(start, 'ddMMyyyy')
        let _end = this.datepipe.transform(end,'ddMMyyyy') //transforma as datas em um valor que a api vai processar
    return this.http.get(`${API_CONFIG.baseUrl}/maps/search?start=${_start}&end=${_end}`)
      
  }
  
  public listMapsPeriodDestiny(start: Date, end: Date, id: number){
    let _start = this.datepipe.transform(start, 'ddMMyyyy')
        let _end = this.datepipe.transform(end,'ddMMyyyy') //transforma as datas em um valor que a api vai processar
    return this.http.get(`${API_CONFIG.baseUrl}/maps/search1?start=${_start}&end=${_end}&term=${id}`)
      
  }
  
  public listMapsPeriodCompany(start: Date, end: Date, id: number){
    let _start = this.datepipe.transform(start, 'ddMMyyyy')
        let _end = this.datepipe.transform(end,'ddMMyyyy') //transforma as datas em um valor que a api vai processar
    return this.http.get(`${API_CONFIG.baseUrl}/maps/search2?start=${_start}&end=${_end}&term=${id}`)
      
  }
  
  public listMapsPeriodBusCategory(start: Date, end: Date, id: number){
    let _start = this.datepipe.transform(start, 'ddMMyyyy')
        let _end = this.datepipe.transform(end,'ddMMyyyy') //transforma as datas em um valor que a api vai processar
    return this.http.get(`${API_CONFIG.baseUrl}/maps/search3?start=${_start}&end=${_end}&term=${id}`)
      
  }
  
  reportMapsPeriod(start: any, end: any, term: number, termId: number) {
    console.log(term, termId)
    let _start = this.datepipe.transform(start, 'ddMMyyyy')
        let _end = this.datepipe.transform(end,'ddMMyyyy') //transforma as datas em um valor que a api vai processar
    window.open(`${API_CONFIG.baseUrl}/maps/report?start=${_start}&end=${_end}&param=${term}&paramId=${termId}`, "_blank")
    
  }

}