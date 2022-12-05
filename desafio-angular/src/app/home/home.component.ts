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
  public pedidosProdutos:any = []
  public pedidos:any = []

  //TIPO CHARTS
  bar:ChartType = ChartType.Bar
  pedidosPorMedicamento:ChartType = ChartType.PieChart
  ///////////////////////////////////////////
  public meusDados:any[] = [ ];
  public dadosMedicamento:any = [ ];

  public valTotal:number = 0
  public qtdClientes:number | any

  public optionsMedicamento = {
    title: 'Medicamentos mais Vendidos',
    pieHole: 0.4
  }



  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http)
    this.clienteServico = new ClienteServico(this.http)
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http)
    this.produtoServico = new ProdutoServico(this.http)
    this.chamarDados()

  }

  private async chamarDados() {

    this.produtos = await this.produtoServico.listarProdutos();
    this.pedidosProdutos = await this.pedidoProdutoServico.listarPedidoProduto()
    this.pedidos = await this.pedidoServico.listarPedidos()
    this.qtdClientes = await this.clienteServico.listarTamanhoClientes()
    let listaNovaProdutos = []
    for(let i = 0; i<this.produtos.length;i++){
      listaNovaProdutos.push([this.produtos[i].nome,this.produtos[i].qtdEstoque])
    }
    this.meusDados = listaNovaProdutos

    let listaPedidosProdutosNova = []
    for(let i =0;i<this.pedidosProdutos.length;i++){
      listaPedidosProdutosNova.push( [this.produtos[(this.pedidosProdutos[i].idProduto)-1].nome, this.pedidosProdutos[i].valorTotal])
    }

    for(let i=0;i<this.pedidos.length;i++){
      this.valTotal += this.pedidos[i].valorTotal
    }


    let listaPedidoProdutoOficial =[]
    for(let pedidoProd of listaPedidosProdutosNova){
      for(let o=0;o<pedidoProd.length;o++){
        let nome = pedidoProd[o]
        
      }
    }

    
    console.log(this.pedidos)
    this.dadosMedicamento = listaPedidosProdutosNova
    console.log(this.pedidosProdutos)
    console.log(listaNovaProdutos)

  }

  

}
