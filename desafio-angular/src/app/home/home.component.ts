import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { Cliente } from '../modules/modeloCliente';
import { PedidoProduto } from '../modules/modeloPedidoProduto';
import { Pedido } from '../modules/modeloPedidos';
import { Produto } from '../modules/modeloProduto';
import { ClienteServico } from '../services/serviceClientes/clienteServico';
import { PedidoProdutoServico } from '../services/servicePedidosProdutos/pedidoProdutoServico';
import { PedidoServico } from '../services/servicesPedidos/pedidoServico';
import { ProdutoServico } from '../services/servicesProdutos/produtoServico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private routerParams: ActivatedRoute,
  
  ) { }
  
  //declaração de servicos para buscar os dados da api
  private pedidoServico:PedidoServico = {} as PedidoServico
  private clienteServico:ClienteServico = {} as ClienteServico
  private pedidoProdutoServico:PedidoProdutoServico = {} as PedidoProdutoServico
  private produtoServico:ProdutoServico = {} as ProdutoServico


// declarar dados
  public pedido:Pedido | undefined = {} as Pedido
  public pedidoProduto:PedidoProduto | any = {} as PedidoProduto
  public cliente:Cliente | undefined = {} as Cliente
  public produtos:Produto[] | any = [] 

  bar:ChartType = ChartType.Bar
  
  public meusDados:any[] = [ ];

  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http)
    this.clienteServico = new ClienteServico(this.http)
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http)
    this.produtoServico = new ProdutoServico(this.http)
    this.chamarDados()
  }

  private async chamarDados() {

    this.produtos = await this.produtoServico.listarProdutos();
  
    //    this.pedidoProduto = await this.pedidoProdutoServico.buscarPedidoProdutoPorId(id)

    let listaNovaProdutos = []
    for(let i = 0; i<this.produtos.length;i++){
      listaNovaProdutos.push([this.produtos[i].nome,this.produtos[i].qtdEstoque])
    }
    this.meusDados = listaNovaProdutos
    console.log(listaNovaProdutos)

  }

  

}
