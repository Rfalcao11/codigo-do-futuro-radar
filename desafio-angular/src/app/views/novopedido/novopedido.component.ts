import { AnimateTimings } from '@angular/animations';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modules/modeloCliente';
import { PedidoProduto } from 'src/app/modules/modeloPedidoProduto';
import { Pedido } from 'src/app/modules/modeloPedidos';
import { Produto } from 'src/app/modules/modeloProduto';
import { ClienteServico } from 'src/app/services/serviceClientes/clienteServico';
import { PedidoProdutoServico } from 'src/app/services/servicePedidosProdutos/pedidoProdutoServico';
import { PedidoServico } from 'src/app/services/servicesPedidos/pedidoServico';
import { ProdutoServico } from 'src/app/services/servicesProdutos/produtoServico';

@Component({
  selector: 'app-novopedido',
  templateUrl: './novopedido.component.html',
  styleUrls: ['./novopedido.component.css'],
})
export class NovopedidoComponent implements OnInit {
  constructor(
    private router:Router,
    private http:HttpClient,
    private routerParams: ActivatedRoute,
  ) {}

  public pedidoForm: any = {
    idPedido: null,
    cpf: null,
    data: null,
  };

  private pedidoServico:PedidoServico = {} as PedidoServico
  private clienteServico:ClienteServico = {} as ClienteServico
  private pedidoProdutoServico:PedidoProdutoServico = {} as PedidoProdutoServico
  private produtoServico:ProdutoServico = {} as ProdutoServico

  public titulo:String = "Novo Pedido"


  public tamanhoPedido:number | any
  
  public ListaProdFake: any  = [] 
  public pedidoProdutoFake:[] | undefined = []
  public produto:Produto | any = {} as Produto
  public valorPedidoTotal: number | any = 0

  public pedido:Pedido | undefined = {} as Pedido
  public pedidoProduto:PedidoProduto | any = {} as PedidoProduto
  public cliente:Cliente | undefined = {} as Cliente
  public produtos:Produto[] | any = [] 
  public EAN:number | undefined 
  public EANValido: boolean = false
  public CPFCadastrado: boolean = false
  public CPFValido: boolean = false
  public cpfCliente:String | undefined = this.cliente?.cpf
  public validaEans:number[]| any = []
  public validaPedidoProduto:boolean = false
  //teste
  public atualiza: boolean = false

  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http)
    this.clienteServico = new ClienteServico(this.http)
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http)
    this.produtoServico = new ProdutoServico(this.http)

    let id:Number = this.routerParams.snapshot.params['id']
    if(id){
      this.atualiza = true
      this.editaPedido(id)
    }else{
      this.pedidoForm.data = formatDate(new Date(), 'dd/MM/yyyy', 'pt');;
      console.log(this.pedidoForm.data)
      this.buscaTamanhoListaPedido()
    }
  }

  searchcpf(event: any) {
    let id = String(event.target.value)
    this.buscarcpf(id)
  }

      private async buscarcpf(id: string) {
        try{
          this.cliente = await this.clienteServico.buscarClientePorCPF(id)  
          this.CPFValido = true
        }catch(err){
          let resetLista:any = []
          this.cliente = resetLista
          this.CPFValido = false
          alert("CPF NÃO ENCONTRADO")
        }
      }

  searchproduct(event: any) {
    let id = String(event.target.value)
    this.buscarProd (Number(id))
    }
    //this.buscarcpf(Number(id))
  

  private async buscarProd(id:Number){
    try{
      this.produto = await this.produtoServico.buscarProdutoPorId(id);
      this.EANValido = true
    }catch(err){
      let resetLista:any = []
      this.produto = resetLista
      this.EANValido = false
    }
  }

  private async editaPedido(id: Number) {
    this.titulo = "Ver Pedido"
    this.pedido = await this.pedidoServico.buscarPedidoPorId(id)
    this.valorPedidoTotal = this.pedido?.valorTotal
    this.produtos = await this.produtoServico.listarProdutos();
    if(this.pedido && this.pedido.cpfCliente) this.cliente = await this.clienteServico.buscarClientePorCPF(this.pedido.cpfCliente)
    this.pedidoProduto = await this.pedidoProdutoServico.buscarPedidoProdutoPorId(id)
    if(this.cliente && this.cliente.cpf) {this.CPFCadastrado = true; this.CPFValido = true}
    else {this.CPFCadastrado  = false }
    console.log(this.pedidoProduto)
    console.log(this.produtos)

  }

  adicionarPedidoProduto(){
    let listaFake = {
      idProd: this.produto.id,
      nomeProd: this.produto.nome,
      desc: this.produto.desc,
      qtd: this.pedidoProduto.qtd,
      valTotal: (this.produto.valor * this.pedidoProduto.qtd) 
    }
    if(!listaFake.qtd){
      alert("precisa ter uma quantidade")
      return
    }else if(listaFake.qtd > this.produto.qtdEstoque){
      alert("Quantidade maior que Permitida")
      return
    }
    if(this.validaEans){
    for(let i = 0;i < this.validaEans.length;i++){
      if(listaFake.idProd === this.validaEans[i]){
      alert("Ean ja cadastrado");
      return
      }
    }
    }
    this.ListaProdFake.push(listaFake)
    this.validaEans.push(listaFake.idProd)
    this.valorPedidoTotal = this.valorPedidoTotal + (this.produto.valor * this.pedidoProduto.qtd)
    this.atualiza = true

  }

  excluirPedidoProduto(pedidofake: any){
    let listaPedidoNova = []
    for(let i=0;i<this.ListaProdFake.length;i++){
      if(this.ListaProdFake[i].idProd != pedidofake.idProd){
        listaPedidoNova.push(this.ListaProdFake[i])
      }else{
        this.valorPedidoTotal -= pedidofake.valTotal
        let validaEan:any = []
        for(let i=0;i<this.validaEans.length;i++){
          if(this.validaEans[i] != pedidofake.idProd){
            validaEan.push(this.validaEans[i])
          }
        }
        this.validaEans = validaEan

      }

    }
    this.ListaProdFake = listaPedidoNova
  }

  private async buscaTamanhoListaPedido(){
    this.tamanhoPedido = await this.pedidoServico.listarTamanhoPedidos();
    this.produtos = await this.produtoServico.listarProdutos();
    
  }

  salvar(){
    if(this.pedido && this.pedido.id > 0){
      this.pedidoServico.editarPedido(this.pedido)
    }
    else{
      if(confirm("Finalizar Pedido?")){

      this.pedidoServico.criarPedido({
        id: 0, 
        cpfCliente: this.cliente?.cpf,
        valorTotal: this.valorPedidoTotal,
        data: this.pedidoForm.data,
      });
      for(let i=0;i<this.ListaProdFake.length;i++){
        this.pedidoProdutoServico.criarPedidoProduto({
          id: 0,
          idPedido: this.tamanhoPedido+1,
          idProduto: this.ListaProdFake[i].idProd,
          qtd: this.ListaProdFake[i].qtd,
          valorTotal: this.ListaProdFake[i].valTotal
        });
      for(let i=0;i<this.ListaProdFake.length;i++){
        debugger
        this.produtoServico.editarProduto({
          id: this.ListaProdFake[i].idProd,
          nome: this.ListaProdFake[i].nomeProd,
          desc: this.ListaProdFake[i].desc,
          valor: this.produtos[(this.ListaProdFake[i].idProd)-1].valor,
          qtdEstoque: (this.produtos[(this.ListaProdFake[i].idProd)-1].qtdEstoque - this.ListaProdFake[i].qtd)
        });
      }
      }
    }else return

    }
    this.router.navigateByUrl("/pedidos")
  }

  public cancelar():void{
    this.router.navigateByUrl('/pedidos');
  }

}
