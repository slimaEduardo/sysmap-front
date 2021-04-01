import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'app/models/company.model';
import { Page } from 'app/models/page';
import { CompanyService } from 'app/services/company.service';
import { PrimeNGConfig } from 'primeng/api';
import {PaginatorModule} from 'primeng/paginator';

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
  public show: boolean = true
  public company: Company
  public pageNumber = 0
  public pageSize = 10
  public orderBy = 'id'
  public totalRecords: number
  public direction: string = 'ASC'
  public  loading: boolean

  @Output() public updateList: EventEmitter<any> = new EventEmitter<any>()
  
  constructor(private companyService:CompanyService) { 
    
  }

   ngOnInit(): void {
       this.listCompanies(this.pageNumber, this.pageSize, this.orderBy, this.direction)
     
   } 

  public listCompanies(page: number, size: number, orderBy: string, direction: string){
    this.loading = true
    this.companyService.getCompanies(page, size, orderBy, direction)
    .subscribe(response => {
      this.page = response
      this.totalRecords = this.page.totalElements
      console.log(this.totalRecords)
      this.companies = response.content
      this.loading = false
    })
  }

  public addCmp(){
    this.companyService.insert(this.formulary.value)
        .subscribe(response => {
          this.att()
        },
        error => {
          console.log(error)
        })
  }

  public paginate(event){
  console.log(event)
  this.pageNumber = event.first/event.rows
  this.orderBy = event.sortField
  var direction = event.sortOrder == -1 ? 'ASC' :  'DESC'
  console.log(this.pageNumber, event.rows, event.sortField, direction)
  this.listCompanies(this.pageNumber, event.rows, this.orderBy, direction) 
  }

  public edit(id: number){
    console.log("editar", id)
    let aux: Company
    aux = this.formulary.value
    this.companyService.update(id,aux)
    this.updateList.emit(this.att())
  }

  public delete(id: number){
    this.companyService.delete(id)
    this.att()
  }

  public resetFormulary(){
    this.formulary.reset()
  }

  public att() {
    this.listCompanies(this.pageNumber, this.pageSize, this.orderBy, this.direction) // para atualizar o dados do array
      this.show = false // tirar tabela do DOM
        setTimeout(() => {
          this.show = true // retorna com tabela para o DOM e os dados atualizados do
          this.listCompanies(this.pageNumber, this.pageSize, this.orderBy, this.direction)
        }, 50);
    }

    public listCompany(id: number){
      this.companyService.findById(id).subscribe(response => {
        this.company = response
        this.formulary = new FormGroup({
          id: new FormControl(this.company.id),
          name: new FormControl(this.company.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
        })
      },
      error => {
      console.log(error)
      })
        
    }

}

