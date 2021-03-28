import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from 'app/models/page';
import { CompanyService } from 'app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

  public formulary: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('' , [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    })


  displayedColumns: string[] = ['id', 'name'];
      
  public companies: any[] = []
  public page : Page
  
  
  constructor(private companyService:CompanyService) { 
    
  }

   ngOnInit(): void {
       this.listCompanies(0, 10)
   } 

  public listCompanies(page: number, size: number){
    this.companyService.getCompanies(page, size)
    .subscribe(response => {
      this.page = response
      this.companies = response.content
    })
  }

  public addCmp(){

  }

  public changePage(event){
  console.log(event)  
  this.listCompanies(event.page, event.size) 
  }

  public edit(id: number){
    console.log("editar", id)
  }

  public delete(id: number){
    console.log("excluir", id)
  }

  public resetFormulary(){
    this.formulary.reset()
  }

}
