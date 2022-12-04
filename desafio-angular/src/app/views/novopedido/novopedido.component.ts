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
  
  public pedido:Pedido | undefined = {} as Pedido
  public pedidoProduto:PedidoProduto | any = {} as PedidoProduto
  public cliente:Cliente | undefined = {} as Cliente
  public produtos:Produto[] | undefined = []
  public EAN:number | undefined 
  public EANValido: boolean = false
  public CPFCadastrado: boolean = false


  public cpfCliente:String | undefined = this.cliente?.cpf

  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http)
    this.clienteServico = new ClienteServico(this.http)
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http)
    this.produtoServico = new ProdutoServico(this.http)

    let id:Number = this.routerParams.snapshot.params['id']
    if(id){
      this.editaPedido(id)
    }
    this.pedidoForm.data = new Date();
  }

  searchcpf(event: any) {
    let id = String(event.target.value)
    this.buscarcpf(Number(id))
  }

  buscaCpf(id:any){
    let idOK = Number(id)
    this.buscarcpf(idOK);
  }

      private async buscarcpf(id: Number) {
        try{
          this.cliente = await this.clienteServico.buscarClientePorCPF(id)  
          console.log(this.cliente)
        }catch(err){
          alert("CPF INVALIDO")
        }
      }

  searchproduct(event: any) {
    let id = String(event.target.value)
    if(this.produtos && Number(id) > this.produtos?.length){
       console.log(this.produtos.length); 
       this.EAN = -1
       this.EANValido = false;
    }else{
        this.EANValido = true
       this.EAN = Number(id)
    }
    //this.buscarcpf(Number(id))
  }

  private async editaPedido(id: Number) {
    this.titulo = "Editar Pedido"
    this.pedido = await this.pedidoServico.buscarPedidoPorId(id)
    this.produtos = await this.produtoServico.listarProdutos();
    if(this.pedido && this.pedido.cpfCliente) this.cliente = await this.clienteServico.buscarClientePorCPF(this.pedido.cpfCliente)
    this.pedidoProduto = await this.pedidoProdutoServico.buscarPedidoProdutoPorId(id)
    if(this.produtos && this.produtos) 
    if(this.cliente && this.cliente.cpf) {this.CPFCadastrado = true }
    else {this.CPFCadastrado  = false }
    console.log(this.pedidoProduto)
    console.log(this.produtos)

  }

  salvar(){
    if(this.pedido && this.pedido.id > 0){
      this.pedidoServico.editarPedido(this.pedido)
    }
    else{
      this.pedidoServico.criarPedido({
        id: 0, 
        cpfCliente: this.pedido?.cpfCliente,
        valorTotal: this.pedido?.valorTotal,
        data: this.pedido?.data,
      });
    }
    this.router.navigateByUrl("/pedidos")
  }

  public cancelar():void{
    this.router.navigateByUrl('/pedidos');
  }

}
