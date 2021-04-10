import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'app/models/company.model';
import { Page } from 'app/models/page';
import { CompanyService } from 'app/services/company.service';
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


  displayedColumns: string[] = ['id', 'name'];
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
      //console.log(this.totalRecords)
      this.companies = response.content
      this.loading = false
    })
  }

  public addCmp(){
    this.companyService.insert(this.formulary.value)
        .subscribe(response => {
          console.log(response)
          //let _comp: Company = response.body.valueOf()
          this.showNotification(`Empresa criada com suecesso`, 'success')
          this.att()
        },
        error => {
          console.log(error)
        })
        $('#modalAddComp').modal('hide')
  }

  public paginate(event: LazyLoadEvent){
  //console.log(event)
  this.pageNumber = Math.floor(event.first/event.rows)
  this.orderBy = event.sortField
  
  var direction = event.sortOrder == -1 ? 'DESC' :  'ASC'
  //console.log(this.pageNumber, event.rows, event.sortField, direction, event.globalFilter)
  this.listCompanies(this.pageNumber, event.rows, this.orderBy, direction)
  if(event.globalFilter != null){
    console.log("chegamos aqui!")
  } 
  }

  public edit(id: number){
    //console.log("editar", id)
    let aux: Company
    aux = this.formulary.value
    this.companyService.update(id,aux)
    .subscribe(response => {
      console.log(response)
      this.showNotification("Empresa editada com suecesso", 'success')
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
      this.showNotification("Empresa excluída com suecesso", 'success')
    },
    error => {
      console.log("Erro: ",error.error.msg)
      this.showNotification( error.error.msg, 'danger')
    })
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

    showNotification(message: string, color: string){
      //const type = ['','info','success','warning','danger'];

      //const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: message

      },{
          type: color,
          timer: 2000,
          placement: {
              from: 'top',
              align: 'center'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}

