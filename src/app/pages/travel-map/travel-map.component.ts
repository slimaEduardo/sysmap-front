import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Destiny } from 'app/models/destiny.model';
import { Page } from 'app/models/page';
import { BusCategory, TravelMap, TravelMapNew } from 'app/models/travel-map.model';
import { TravelMapService } from 'app/services/travel-map.service';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { catchError, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DestinyService } from 'app/services/destiny.service';
import { CompanyService } from 'app/services/company.service';
import { Company } from 'app/models/company.model';
import { NotificationService } from 'app/services/notification.service';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.css'],
  providers: [TravelMapService, DestinyService, CompanyService, DatePipe]
})
export class TravelMapComponent implements OnInit {

  public formulary: FormGroup = new FormGroup({
    id: new FormControl(''),
    boardingDate: new FormControl(''),
    boardingTime: new FormControl(''),
    companyId: new FormControl('' , [Validators.required]),
    destinyId: new FormControl('' , [Validators.required]),
    passQtt: new FormControl('' , [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    busId: new FormControl('' , [Validators.required])
    })

    public searchFormulary: FormGroup = new FormGroup({
      initialDate: new FormControl(''),
      finalDate: new FormControl(''),
      companyId: new FormControl(''),
      destinyId: new FormControl(''),
      busId: new FormControl('' )
    })

  public travelMaps: any[] = []
  public page : Page
  public show: boolean = true
  public travelMap: TravelMap
  public travelMapNew: TravelMapNew
  public pageNumber = 0
  public pageSize = 10
  public orderBy = 'id'
  public totalRecords: number
  public direction: string = 'ASC'
  public  loading: boolean
  public globalFilter: string = ""
  public busCategories: BusCategory[] = []
  public destinyName: string
  public companyName: string
  public errors: string[] = []

  private subjectSearch: Subject<string> = new Subject<string>()
  public destinies: Destiny[] = []
  companies: Company[];

  @Output() public updateList: EventEmitter<any> = new EventEmitter<any>()
  


  constructor(private travelMapService: TravelMapService, 
              private destinyService: DestinyService, 
              private companyService: CompanyService,
              private notificationService: NotificationService) { 
    
  }

  public listMaps(){
    this.loading = true
    this.travelMapService.getMaps()
    .subscribe((response: any) => {
      this.travelMaps = response
      console.log(this.travelMaps)
      this.loading = false
    })
  }

  ngOnInit(): void {
    this.listMaps()
    
    this.listCategories()

  }

  /* public paginate(event: LazyLoadEvent){
    //console.log(event)
    this.pageNumber = Math.floor(event.first/event.rows)
    this.orderBy = event.sortField
    
    var direction = event.sortOrder == -1 ? 'DESC' :  'ASC'
    //console.log(this.pageNumber, event.rows, event.sortField, direction, event.globalFilter)
    this.listMaps(this.pageNumber, this.pageSize, this.orderBy, this.direction)
    } */

    public edit(id: number){
      console.log(this.formulary.value.destinyId.id)
      if(this.formulary.value.destinyId.id !== undefined){
      let aux1: number = this.formulary.value.destinyId.id
      this.formulary.patchValue({destinyId: aux1})
      }else{
       this.errors.push( 'Destino inválido.') 
      }
      if(this.formulary.value.companyId.id !== undefined){
      let aux2 = this.formulary.value.companyId.id
      this.formulary.patchValue({companyId: aux2})
      }else{
        this.errors.push('Empresa inválida.') 
       }
      let aux: TravelMapNew
      aux = this.formulary.value
      console.log(aux, "ID: ",this.formulary.value.id)
      this.travelMapService.update(this.formulary.value.id,aux)
      .subscribe(response => {
        console.log(response)
        this.notificationService.showNotification("Mapa editado com suecesso", 'success', 'top')
      },
      error => {
        console.log(error)
        this.notificationService.showNotification(`Revise as opções inseridas: ${this.errors}`, 'danger', 'bottom')
      })
      $('#modalUpdateComp').modal('hide')
      this.updateList.emit(this.att())
    }

    public att() {
      this.listMaps() // para atualizar o dados do array
        this.show = false // tirar tabela do DOM
          setTimeout(() => {
            this.show = true // retorna com tabela para o DOM e os dados atualizados do
            this.listMaps()
          }, 50);
      }

      public addObj(){
        let aux: number = this.formulary.value.destinyId.id
        this.formulary.patchValue({destinyId: aux})//corrige o valor do formulário no campo do destino
        aux = this.formulary.value.companyId.id
        this.formulary.patchValue({companyId: aux})
        console.log(this.formulary.value)
        this.travelMapService.insert(this.formulary.value)
        .subscribe(response => {
          console.log(response)
          this.notificationService.showNotification("Mapa criado com suecesso", 'success', 'bottom')
        },
        error => {
          console.log(error)
          this.notificationService.showNotification(`Revise as opções inseridas. ${error.name}`, 'danger', 'bottom')//Fazer a API retornar os erros
        })
        
        this.updateList.emit(this.att())
      }

      public delete(){
        console.log("ID: ", this.formulary.value.id)
        this.travelMapService.delete(this.formulary.value.id)
        .subscribe(response => {
          console.log(response)
          this.notificationService.showNotification("Mapa excluído com suecesso", 'success','top')
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

      public listObj(id: number){
        this.travelMapService.findById(id).subscribe(response => {
          console.log(response)
          this.travelMap = response
          this.destinyName = this.travelMap.destiny.name
          this.companyName = this.travelMap.company.name
          this.formulary = new FormGroup({
            id: new FormControl(this.travelMap.id),
            boardingDate: new FormControl(this.travelMap.boardingDate),
            boardingTime: new FormControl(this.travelMap.boardingTime),
            companyId: new FormControl(this.travelMap.company.id , [Validators.required]),
            destinyId: new FormControl(this.travelMap.destiny.id, [Validators.required]),
            passQtt: new FormControl(this.travelMap.passQtt, [Validators.required]),
            busId: new FormControl(this.travelMap.busCategory.id , [Validators.required])
          })
        },
        error => {
        console.log(error)
        })
          
      }

      public listCategories(){
        this.travelMapService.listCategories()
        .then(response => {
          this.busCategories = response
          //console.log(this.typeLines)
        })
      }

      public listDestinies(name: string){
        
      }

     public searchDestiny(searchTerm: string){
        console.log(searchTerm)
       this.destinyService.listByname(searchTerm)
       .then((resp: Destiny[]) => {
         this.destinies = resp
       })
        console.log("Resultado: ",this.destinies)
     }

     public searchCompany(searchTerm: string){
      console.log(searchTerm)
     this.companyService.listByname(searchTerm)
     .then((resp: Company[]) => {
       this.companies = resp
     })
      console.log("Resultado: ",this.companies)
   }

     public getId(term: Event){
       console.log(term)
       this.formulary.patchValue({destinyId: term})
      }

  public searchMaps(){
        console.log(this.searchFormulary)
        console.log(this.searchFormulary.value.destinyId.id)
        console.log(this.searchFormulary.value.busId)
        console.log(this.searchFormulary.value.companyId.id)

        if (this.searchFormulary.value.destinyId.id !== undefined){
          console.log('chegamos aqui')
          this.travelMapService.listMapsPeriodDestiny(this.searchFormulary.value.initialDate, 
            this.searchFormulary.value.finalDate,this.searchFormulary.value.destinyId.id )
            .subscribe((response: any) => {
              console.log(response)
              this.travelMaps = response
              $('#modalSearch').modal('hide')
            })
        }else if(this.searchFormulary.value.companyId.id !== undefined){
          this.travelMapService.listMapsPeriodCompany(this.searchFormulary.value.initialDate, 
            this.searchFormulary.value.finalDate,this.searchFormulary.value.companyId.id)
            .subscribe((response: any) => {
              console.log(response)
              this.travelMaps = response
              $('#modalSearch').modal('hide')
            })
        }else if(this.searchFormulary.value.busId !== ''){
          this.travelMapService.listMapsPeriodBusCategory(this.searchFormulary.value.initialDate, 
            this.searchFormulary.value.finalDate,this.searchFormulary.value.busId)
            .subscribe((response: any) => {
              console.log(response)
              this.travelMaps = response
              $('#modalSearch').modal('hide')
            })
        }else{
          this.travelMapService.listMapsPeriod(this.searchFormulary.value.initialDate, this.searchFormulary.value.finalDate)
        .subscribe((response: any) => {
          console.log(response)
          this.travelMaps = response
          console.log(this.travelMaps)
          $('#modalSearch').modal('hide')
        })
      }
      this.searchFormulary.reset()
  }

  public reportMaps(){
    this.travelMapService.reportMapsPeriod(this.searchFormulary.value.initialDate, this.searchFormulary.value.finalDate)
        /* .subscribe((response: any) => {
          console.log(response)
          $('#modalReport').modal('hide')
          window.open(response.body)
          this.notificationService.showNotification("Relatório criado com suecesso", 'success', 'top')
        },
        error => {
          console.log("Erro: ",error.error.msg)
          $('#modalReport').modal('hide')
          this.notificationService.showNotification( error.error.msg, 'danger','top')
        })
        this.searchFormulary.reset() */
  }

}
