import { CurrencyPipe } from '@angular/common';
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

  
  public valTotal:number = 0
  public qtdClientes:number | any


// declarar dados
  public pedido:Pedido | undefined = {} as Pedido
  public pedidoProduto:PedidoProduto | any = {} as PedidoProduto
  public cliente:Cliente | undefined = {} as Cliente
  public produtos:Produto[] | any = [] 
  public pedidosProdutos:any = []
  public pedidos:any = []
  public todosClientes:any = []

  //TIPO CHARTS
  bar:ChartType = ChartType.Bar
  pedidosPorMedicamento:ChartType = ChartType.PieChart
  chartGraficoData:ChartType = ChartType.GeoChart
  graficoColuna:ChartType = ChartType.ColumnChart
  ///////////////////////////////////////////
  
  //DADOS CHARTS
  public meusDados:any[] = [ ];
  public dadosMedicamento:any = [ 
    
  ];
  public dadosGraficoData:any = [ ]

  public dataGraficoColuna = [
    ['Move', 23],
    ["King's pawn (e4)", 44],
    ["Queen's pawn (d4)", 31],
    ["Knight to King 3 (Nf3)", 12],
    ["Queen's bishop pawn (c4)", 10],
    ['Other', 3]

  ]
  
  ////////////////////////////////////


  //OPTIONS DOS CHARTS
  public optionsColuna = {
    width: 800,
    legend: { position: 'none' },
    chart: {
      title: 'Chess opening moves',
      subtitle: 'popularity by percentage' },
    axes: {
      x: {
        0: { side: 'top', label: 'White to move'} // Top x-axis.
      }
    },
    bar: { groupWidth: "90%" }
  };

  public geoChartsOption = {
    region: 'BR',
    resolution: 'provinces',
    width: 900,
    height: 300,
    colorAxis: {
      colors: ['#EAF2F8','#D4E6F1', '#A9CCE3','#7FB3D5', '#5499C7','#2980B9','#2471A3','#1F618D','#1A5276', '#154360']
  }
  
}


  public optionsProdutos = {
    pieSliceText: 'label',
    legend: 'none',

  }
  public optionsMedicamento = {
    pieSliceText: 'none',
    pieHole: 0.4
  }
  /////////////////////////////////////////////////

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
    this.todosClientes = await this.clienteServico.listarClientes()

    //DADOS PRODUTOS - ESTOQUE
    let listaNovaProdutos = []
    for(let i = 0; i<this.produtos.length;i++){
      listaNovaProdutos.push([this.produtos[i].nome,this.produtos[i].qtdEstoque])
    }
    this.meusDados = listaNovaProdutos
    /* ------------------------------------------------------------------------------*/

    //DADOS GANHO POR PEDIDOS
    let listaPedidosProdutosNova = []
    for(let i =0;i<this.pedidosProdutos.length;i++){
      listaPedidosProdutosNova.push( [this.produtos[(this.pedidosProdutos[i].idProduto)-1].nome, this.pedidosProdutos[i].valorTotal])
    }
    let filtrado:any = {}
    for(let i=0; i< listaPedidosProdutosNova.length; i++){
      let dado = listaPedidosProdutosNova[i]
      if(filtrado[dado[0]]) {
         filtrado[dado[0]] += dado[1]
      }
      else{
         filtrado[dado[0]] = dado[1]
      }
    }
    let chaves = Object.keys(filtrado)
    let novo = []
    for(let i=0; i< chaves.length; i++){
      let key = chaves[i]
      let valor = filtrado[key]
      novo.push([key, valor])   

    }
    this.dadosMedicamento = novo
    /* --------------------------------------------------------------------------------------------------*/


    //DADO GANHO TOTAL
    for(let i=0;i<this.pedidos.length;i++){
      this.valTotal += this.pedidos[i].valorTotal
    } 
    /* --------------------------------------------------------------------------------------------------*/


    //DADO GRAFICO GEOGRAFICO - CALOR
    let listaClientesPorEstado = []
    for(let i=0;i<this.todosClientes.length;i++){
      listaClientesPorEstado.push([`BR-${this.todosClientes[i].estado}`, 1])
    }
    let Estadofiltrado:any = {}
    for(let i=0; i< listaClientesPorEstado.length; i++){
      let dado = listaClientesPorEstado[i]
      if(Estadofiltrado[dado[0]]) {
        Estadofiltrado[dado[0]] += dado[1]
      }
      else{
        Estadofiltrado[dado[0]] = dado[1]
      }
    }
    let chavesCliente = Object.keys(Estadofiltrado)
    let novoDado = []
    for(let i=0; i< chavesCliente.length; i++){
      let key = chavesCliente[i]
      let valor = Estadofiltrado[key]
      novoDado.push([key, valor])   

    }
    this.dadosGraficoData = novoDado
    console.log("Lista estado",this.dadosGraficoData)
    

    // console.log(listaPedidosProdutosNova)
    // console.log(this.pedidos)
    // console.log(this.pedidosProdutos)
    // console.log(listaNovaProdutos)
    
  }

  

}
