import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserNew } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

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
    profileId: new FormControl('' , [Validators.required]),
    password: new FormControl('' , [Validators.required])
    })

  displayedColumns: string[] = ['id', 'name', 'userName', 'userProfile', 'password','actions']
  dataSource: MatTableDataSource<User> 
  public users: User[]
  public user: User
  public show: boolean = true

  constructor(public userService: UserService) { }

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
          
        },
        error => {
          console.log(error)
          
        })
        
  }

  public listObj(id: number){
    this.userService.findById(id).subscribe(response => {
      console.log(response)
      this.user = response
      this.formulary = new FormGroup({
        id: new FormControl(this.user.id),
        name: new FormControl(this.user.name),
        userName: new FormControl(this.user.userName),
        profileId: new FormControl(this.user.userProfile , [Validators.required]),
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
      //this.notificationService.showNotification("Mapa excluído com suecesso", 'success','top')
    },
    error => {
      console.log("Erro: ",error.error.msg)
     // this.notificationService.showNotification( error.error.msg, 'danger','top')
    })
    this.att()
  }

  public edit(id: number){
    let aux: UserNew = this.formulary.value
    console.log(aux)
    this.userService.update(this.formulary.value.id,aux)
      .subscribe(response => {
        console.log(response)
       
      },
      error => {
        console.log(error)
       
      })
      
  }

  public att() {
    this.listUsers() // para atualizar o dados do array
      this.show = false // tirar tabela do DOM
        setTimeout(() => {
          this.show = true // retorna com tabela para o DOM e os dados atualizados do
          this.listUsers()
        }, 50);
    }
  
  public resetFormulary(){
    this.formulary.reset()
    
  }
}
