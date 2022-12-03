import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/modules/modeloPedidos';
import { PedidoServico } from 'src/app/services/servicesPedidos/pedidoServico';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

  
  public pedidos:Pedido[] | undefined = []
  private pedidoServico:PedidoServico = {} as PedidoServico 


  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http)
    this.listaPedidos()
  }

  private async listaPedidos(){ //METODO QUE LISTA OS PRODUTOS PEGANDO DA API JUNTO COM O 'PRODUTO SERVICO'
    this.pedidos = await this.pedidoServico.listarPedidos();
  }

  novoPedido(){
    this.router.navigateByUrl("pedidos/novo")
  }

  editarPedido(id:Number){
    this.router.navigateByUrl(`pedidos/novo/${id}`)
  }


  

}
