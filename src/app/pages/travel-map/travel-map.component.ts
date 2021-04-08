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


@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.css'],
  providers: [TravelMapService, DestinyService, CompanyService]
})
export class TravelMapComponent implements OnInit {

  public formulary: FormGroup = new FormGroup({
    id: new FormControl(''),
    boardingDate: new FormControl(''),
    boardingTime: new FormControl(''),
    companyId: new FormControl('' , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')]),
    destinyId: new FormControl('' , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')]),
    passQtt: new FormControl('' , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')]),
    busId: new FormControl('' , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')])
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

  private subjectSearch: Subject<string> = new Subject<string>()
  public destinies: Destiny[] = []
  companies: Company[];

  @Output() public updateList: EventEmitter<any> = new EventEmitter<any>()
  


  constructor(private travelMapService: TravelMapService, private destinyService: DestinyService, private companyService: CompanyService) { 
    
  }

  public listMaps(page: number, size: number, orderBy: string, direction: string){
    this.loading = true
    this.travelMapService.getCompanies(page, size, orderBy, direction)
    .subscribe(response => {
      this.page = response
      this.totalRecords = this.page.totalElements
      this.travelMaps = response.content
      //console.log(this.destinies)
      this.loading = false
    })
  }

  ngOnInit(): void {
    this.listMaps(this.pageNumber, this.pageSize, this.orderBy, this.direction)
    
    this.listCategories()

   /*  this.destinies = this.subjectSearch.pipe(debounceTime (100),
        distinctUntilChanged(),
        switchMap((term: string) => {console.log(term)
        if(term.trim() == ''){
          return of<Destiny[]>([]); //retorna um array vazio
        }
        return this.destinyService.listByname(term)
        })),
        catchError((error) => {
          console.log(error)
          return of<Destiny[]>([])
        }) */
   
  }

  public paginate(event: LazyLoadEvent){
    //console.log(event)
    this.pageNumber = Math.floor(event.first/event.rows)
    this.orderBy = event.sortField
    
    var direction = event.sortOrder == -1 ? 'DESC' :  'ASC'
    //console.log(this.pageNumber, event.rows, event.sortField, direction, event.globalFilter)
    this.listMaps(this.pageNumber, event.rows, this.orderBy, direction)
    }

    public edit(id: number){
      //console.log("editar", id)
      let aux: TravelMapNew
      aux = this.formulary.value
      this.travelMapService.update(id,aux)
      this.updateList.emit(this.att())
    }

    public att() {
      this.listMaps(this.pageNumber, this.pageSize, this.orderBy, this.direction) // para atualizar o dados do array
        this.show = false // tirar tabela do DOM
          setTimeout(() => {
            this.show = true // retorna com tabela para o DOM e os dados atualizados do
            this.listMaps(this.pageNumber, this.pageSize, this.orderBy, this.direction)
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
              this.att()
            },
            error => {
              console.log(error)
            })
      }

      public delete(id: number){
        this.travelMapService.delete(id)
        this.att()
      }
    
      public resetFormulary(){
        this.formulary.reset()
      }

      public listObj(id: number){
        this.travelMapService.findById(id).subscribe(response => {
          console.log(response)
          this.travelMap = response
          this.formulary = new FormGroup({
            id: new FormControl(this.travelMap.id),
            boardingDate: new FormControl(this.travelMap.boardingDate),
            boardingTime: new FormControl(this.travelMap.boardingTime),
            companyId: new FormControl(this.travelMap.companyName , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')]),
            destinyId: new FormControl(this.travelMap.destinyName , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')]),
            passQtt: new FormControl(this.travelMap.passQtt, [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')]),
            busId: new FormControl(this.travelMap.busCategory.id , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')])
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
}
