import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-maps-period',
  templateUrl: './maps-period.component.html',
  styleUrls: ['./maps-period.component.css']
})
export class MapsPeriodComponent implements OnInit {

  public formulary: FormGroup = new FormGroup({
    id: new FormControl(''),
    boardingDate: new FormControl(''),
    boardingTime: new FormControl(''),
    companyId: new FormControl('' , [Validators.required]),
    destinyId: new FormControl('' , [Validators.required]),
    passQtt: new FormControl('' , [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    busId: new FormControl('' , [Validators.required])
    })

  constructor() { }

  ngOnInit(): void {
  }

  public search(firstDate: Date){
    console.log(firstDate)
  }
}
