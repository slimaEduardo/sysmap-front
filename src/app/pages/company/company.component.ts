import { EventEmitter, ViewChild } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'app/models/company.model';
import { Page } from 'app/models/page';
import { CompanyService } from 'app/services/company.service';
import { NotificationService } from 'app/services/notification.service';
import { LazyLoadEvent } from 'primeng/api';

declare var $: any;

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


  displayedColumns: string[] = ['id', 'name', 'actions']
  dataSource: MatTableDataSource<Company> 
  public companies: any[] = []
  public page : Page
  public show: boolean = true
  public company: Company
  public pageNumber = 0
  public pageSize = 10
  public orderBy = 'id'
  public totalRecords: number
  public direction: string = 'DESC'
  public  loading: boolean
  public globalFilter: string = ""

  @Output() public updateList: EventEmitter<any> = new EventEmitter<any>()
  
  constructor(private companyService:CompanyService, private notificationService: NotificationService) { 
    
  }

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.listCompanies()
  } 

  public listCompanies(){
    this.companyService.getCompanies()
    .subscribe(response => {
      this.companies = response
      this.dataSource = new MatTableDataSource(this.companies)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      //console.log(this.totalRecords)
    })
  }

  public addCmp(){
    this.companyService.insert(this.formulary.value)
        .subscribe(response => {
          console.log(response)
          //let _comp: Company = response.body.valueOf()
          this.notificationService.showNotification(`Empresa criada com suecesso`, 'success','top')
          this.att()
        },
        error => {
          console.log(error)
        })
        $('#modalAddComp').modal('hide')
  }

  /* public paginate(event: LazyLoadEvent){
  this.pageNumber = Math.floor(event.first/event.rows)
  this.orderBy = event.sortField
  var direction = event.sortOrder == -1 ? 'DESC' :  'ASC'
  this.listCompanies(this.pageNumber, event.rows, this.orderBy, direction)
  if(event.globalFilter != null){
    console.log("chegamos aqui!")
  } 
  } */

  public edit(id: number){
    //console.log("editar", id)
    let aux: Company
    aux = this.formulary.value
    this.companyService.update(id,aux)
    .subscribe(response => {
      console.log(response)
      this.notificationService.showNotification("Empresa editada com suecesso", 'success','top')
    },
    error => {
      console.log(error)
    })
    $('#modalUpdateComp').modal('hide')
    this.updateList.emit(this.att())
  }

  public delete(id: number){
    this.companyService.delete(id).subscribe(response => {
      console.log(response)
      this.notificationService.showNotification("Empresa exclu??da com suecesso", 'success','top')
    },
    error => {
      console.log("Erro: ",error.error.msg)
      this.notificationService.showNotification( error.error.msg, 'danger','top')
    })
    this.att()
  }

  public resetFormulary(){
    this.formulary.reset()
  }

  public att() {
    this.listCompanies() // para atualizar o dados do array
      this.show = false // tirar tabela do DOM
        setTimeout(() => {
          this.show = true // retorna com tabela para o DOM e os dados atualizados do
          this.listCompanies()
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

