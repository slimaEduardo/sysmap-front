import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Destiny, DestinyNew, TypeLine } from 'app/models/destiny.model';
import { Page } from 'app/models/page';
import { DestinyService } from 'app/services/destiny.service';
import { NotificationService } from 'app/services/notification.service';
import { LazyLoadEvent } from 'primeng/api';

declare var $: any;

@Component({
  selector: 'app-destiny',
  templateUrl: './destiny.component.html',
  styleUrls: ['./destiny.component.css'],
  providers: [DestinyService]
})
export class DestinyComponent implements OnInit {

  public formulary: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('' , [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    distance: new FormControl('' , [Validators.required, Validators.minLength(2), Validators.maxLength(5)]),
    categoryId: new FormControl('' , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')])
    })

  public destinies: any[] = []
  public page : Page
  public show: boolean = true
  public destiny: Destiny
  public destinyNew: DestinyNew
  public pageNumber = 0
  public pageSize = 10
  public orderBy = 'id'
  public totalRecords: number
  public direction: string = 'DESC'
  public  loading: boolean
  public globalFilter: string = ""
  public typeLines: TypeLine[] = []

  @Output() public updateList: EventEmitter<any> = new EventEmitter<any>()

  constructor(private destinyService: DestinyService, private notificationService: NotificationService) { }

  public listDestinies(page: number, size: number, orderBy: string, direction: string){
    this.loading = true
    this.destinyService.getCompanies(page, size, orderBy, direction)
    .subscribe(response => {
      this.page = response
      this.totalRecords = this.page.totalElements
      this.destinies = response.content
      //console.log(this.destinies)
      this.loading = false
    })
  }

  ngOnInit(): void {
    this.listDestinies(this.pageNumber, this.pageSize, this.orderBy, this.direction)
    this.listCategories()
  }

  public paginate(event: LazyLoadEvent){
    //Verifica se há algo no campo de pesquisa
    if(event.globalFilter != null){
      console.log("Chegamos aqui!", event.globalFilter)
      this.destinyService.listByname(event.globalFilter)
      .then(response => {
        this.destinies = response
        console.log(this.destinies)
      })
    }else{
       //console.log(event)
    this.pageNumber = Math.floor(event.first/event.rows)
    this.orderBy = event.sortField
    //Define a ordem a qual a lista é apresentada
    var direction = event.sortOrder == -1 ? 'DESC' :  'ASC'
    this.listDestinies(this.pageNumber, event.rows, this.orderBy, direction)
    }
    }

    public edit(id: number){
      //console.log("editar", id)
      let aux: DestinyNew
      aux = this.formulary.value
      this.destinyService.update(id,aux).subscribe(response => {
        console.log(response)
        this.notificationService.showNotification("Destino editado com suecesso", 'success', 'top')
      },
      error => {
        console.log(error)
      })
      $('#modalUpdate').modal('hide')
      this.updateList.emit(this.att())
    }

    public att() {
      this.listDestinies(this.pageNumber, this.pageSize, this.orderBy, this.direction) // para atualizar o dados do array
        this.show = false // tirar tabela do DOM
          setTimeout(() => {
            this.show = true // retorna com tabela para o DOM e os dados atualizados do
            this.listDestinies(this.pageNumber, this.pageSize, this.orderBy, this.direction)
          }, 50);
      }

      public addObj(){
        console.log(this.formulary.value)
        this.destinyService.insert(this.formulary.value)
            .subscribe(response => {
              console.log(response)
              this.notificationService.showNotification(`${this.formulary.value.name} criado com suecesso com o id ${response.body}`, 'success', 'top')
              this.att()
            },
            error => {
              console.log(error)
            })
            $('#modalAdd').modal('hide')
      }

      public delete(id: number){
        this.destinyService.delete(id).subscribe(response => {
          console.log(response)
          this.notificationService.showNotification("Destino excluído com suecesso", 'success','top')
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
        this.destinyService.findById(id).subscribe(response => {
          console.log(response)
          this.destiny = response
          this.formulary = new FormGroup({
            id: new FormControl(this.destiny.id),
            name: new FormControl(this.destiny.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
            distance: new FormControl(this.destiny.distance,[Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
            categoryId: new FormControl(this.destiny.category.id , [Validators.required, Validators.minLength(2), Validators.maxLength(3), , Validators.pattern('[0-9]')])
          })
        },
        error => {
        console.log(error)
        })
          
      }

      public listCategories(){
        this.destinyService.listCategories()
        .then(response => {
          this.typeLines = response
          //console.log(this.typeLines)
        })
      }
}
