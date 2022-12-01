import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novopedido',
  templateUrl: './novopedido.component.html',
  styleUrls: ['./novopedido.component.css'],
})
export class NovopedidoComponent implements OnInit {
  constructor() {}

  public pedidoForm: any = {
    idPedido: null,
    cpf: null,
    data: null,
  };

  ngOnInit(): void {
    this.pedidoForm.data = new Date();
  }
  searchcpf(event: any) {
    console.log(event);
    console.log(event.target.value);
  }

  searchproduct(event: any) {
    console.log(event);
    console.log(event.target.value);
  }
}
