import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserNew } from 'app/models/user.model';
import { NotificationService } from 'app/services/notification.service';
import { UserService } from 'app/services/user.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {

  public formulary: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    userName: new FormControl(''),
    role: new FormControl('' , [Validators.required]),
    password: new FormControl('' , [Validators.required])
    })

  displayedColumns: string[] = ['id', 'name', 'userName', 'userProfile', 'password','actions']
  dataSource: MatTableDataSource<User> 
  public users: User[]
  public user: User
  public show: boolean = true
  public errors: string[]=[]

  constructor(public userService: UserService, public notificationService: NotificationService) { }
  
  @Output() public updateList: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.listUsers()
  }

  public listUsers(){
    this.userService.listUsers()
    .subscribe((response: any) => {
      console.log(response)
      this.users = response
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  public addObj(){
    console.log(this.formulary)
    this.userService.insert(this.formulary.value)
        .subscribe(response => {
          console.log(response)
          $('#modalAdd').modal('hide')
          this.notificationService.showNotification("Usuário criado com suecesso", 'success', 'top')
        },
        error => {
          console.log(error)
          $('#modalAdd').modal('hide')
          this.notificationService.showNotification(`Revise as opções inseridas: ${this.errors}`, 'danger', 'bottom')
        })
        this.updateList.emit(this.att())
  }

  public listObj(id: number){
    this.userService.findById(id).subscribe(response => {
      console.log(response)
      this.user = response
      this.formulary = new FormGroup({
        id: new FormControl(this.user.id),
        name: new FormControl(this.user.name),
        userName: new FormControl(this.user.userName),
        role: new FormControl(this.user.userProfile , [Validators.required]),
        password: new FormControl(this.user.password , [Validators.required])
      })
    },
    error => {
    console.log(error)
    })
      
  }

  public delete(){
    this.userService.delete(this.formulary.value.id)
    .subscribe(response => {
      console.log(response)
      this.notificationService.showNotification("Usuário excluído com suecesso", 'success','top')
    },
    error => {
      console.log("Erro: ",error)
      this.notificationService.showNotification( error.error.msg, 'danger','top')
    })
    this.att()
  }

  public edit(id: number){
    let aux: UserNew = this.formulary.value
    console.log(aux)
    this.userService.update(this.formulary.value.id,aux)
      .subscribe(response => {
        console.log(response)
        $('#modalUpdate').modal('hide')
        this.notificationService.showNotification("Usuário criado com suecesso", 'success', 'top')
      },
      error => {
        console.log(error)
        $('#modalAdd').modal('hide')
          this.notificationService.showNotification(`Revise as opções inseridas: ${this.errors}`, 'danger', 'bottom')
      })
      this.updateList.emit(this.att())
  }

  public att() : void{
    console.log('chegou aqui')
    this.listUsers() // para atualizar o dados do array
      this.show = false // tirar tabela do DOM
        setTimeout(() => {
          this.show = true // retorna com tabela para o DOM e os dados atualizados do
          this.listUsers()
        }, 100);
    }
  public resetFormulary(){
    this.formulary.reset()
    
  }
}
