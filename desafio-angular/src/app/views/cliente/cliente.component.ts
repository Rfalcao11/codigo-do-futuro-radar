import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/modules/modeloCliente';
import { ClienteServico } from 'src/app/services/serviceClientes/clienteServico';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }
   
  private clienteServico:ClienteServico = {} as ClienteServico
  public clientes:Cliente[] | undefined = []
  

  ngOnInit(): void { //INICIANDO A LISTA DE CLIENTES COM O OBJETO CARREGADO DA API
    this.clienteServico = new ClienteServico(this.http)
    this.listaClientes()
  }

  private async listaClientes(){ //METODO QUE LISTA OS CLIENTES PEGANDO DA API JUNTO COM O 'CLIENTE SERVICO'
    this.clientes = await this.clienteServico.listarClientes();
  }

  novoCliente(){
    this.router.navigateByUrl("clientes/novo")
  }

  editarCliente(id:Number){
    this.router.navigateByUrl(`clientes/novo/${id}`)
  }

}
