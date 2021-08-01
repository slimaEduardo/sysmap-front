import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TypeLine } from 'app/models/destiny.model';
import { LineCategoryService } from 'app/services/line-category.service';
import { NotificationService } from 'app/services/notification.service';

declare var $: any;

@Component({
  selector: 'app-line-categories',
  templateUrl: './line-categories.component.html',
  styleUrls: ['./line-categories.component.css'],
  providers: [LineCategoryService]
})
export class LineCategoriesComponent implements OnInit {

  public formulary: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('' , [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    })


  displayedColumns: string[] = ['id', 'name','status','actions']
  dataSource: MatTableDataSource<TypeLine> 
  public categories: TypeLine[] = []
  public show: boolean = true
  public category: TypeLine
  

  @Output() public updateList: EventEmitter<any> = new EventEmitter<any>()
  
  constructor(private categoryService:LineCategoryService, private notificationService: NotificationService) { 
    
  }

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.listCategories()  
  } 

  public listCategories(){
    this.categoryService.listCategories()
    .then(response => {
      this.categories = response
      console.log(this.categories)
      this.dataSource = new MatTableDataSource(this.categories)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  public addCmp(){
    this.categoryService.insert(this.formulary.value)
        .subscribe(response => {
          console.log(response)
          //let _comp: Company = response.body.valueOf()
          this.notificationService.showNotification(`Categoria criada com suecesso`, 'success','top')
          this.att()
        },
        error => {
          console.log(error)
        })
        $('#modalAddComp').modal('hide')
  }

  
  public edit(id: number){
    //console.log("editar", id)
    let aux: TypeLine
    aux = this.formulary.value
    this.categoryService.update(id,aux)
    .subscribe(response => {
      console.log(response)
      this.notificationService.showNotification("Categoria editada com suecesso", 'success','top')
    },
    error => {
      console.log(error)
    })
    $('#modalUpdateComp').modal('hide')
    this.updateList.emit(this.att())
  }

  public delete(id: number){
    this.categoryService.delete(id).subscribe(response => {
      console.log(response)
      this.notificationService.showNotification("Categoria excluída com suecesso", 'success','top')
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
    this.listCategories() // para atualizar o dados do array
      this.show = false // tirar tabela do DOM
        setTimeout(() => {
          this.show = true // retorna com tabela para o DOM e os dados atualizados do
          this.listCategories()
        }, 50);
    }

    public listObj(id: number){
      this.categoryService.findById(id).subscribe(response => {
        this.category = response
        this.formulary = new FormGroup({
          id: new FormControl(this.category.id),
          name: new FormControl(this.category.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
        })
      },
      error => {
      console.log(error)
      })
        
    }

    public switchStatus(id:number){
      this.categoryService.findById(id).subscribe(response => {
        this.category = response
        //console.log(this.company)
        if(this.category.isActive){
          this.category.isActive = false
          //console.log('resultado', this.company)
        }else{
          this.category.isActive = true
        }
        //atualiza o status no banco
        this.categoryService.update(id,this.category)
    .subscribe(response => {
      //console.log(response)
      this.notificationService.showNotification("Categoria editada com suecesso", 'success','top')
    },
    error => {
      console.log(error)
    })
      })
        
      //this.updateList.emit(this.att())
    }

}
