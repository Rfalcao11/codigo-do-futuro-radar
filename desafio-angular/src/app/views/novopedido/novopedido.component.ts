import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novopedido',
  templateUrl: './novopedido.component.html',
  styleUrls: ['./novopedido.component.css'],
})
export class NovopedidoComponent implements OnInit {
  constructor() {}


  ngOnInit(): void {
    this.pedidoForm.data = new Date()
  }
public pedidoForm:any = {
  data:null
}
  searchproduct(event:any){
    console.log(event)
    console.log(event.target.value)


  }
}
