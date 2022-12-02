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
  public clienteTeste:Cliente[] = [{
    id: 1,
    nome: "Jaziel",
    telefone: "11977774444",
    email:"jaziel@jaziel.com.br",
    cpf: "99977788856",
    cep: "123456",
    logradouro: "Rua teste",
    numero: "123",
    bairro: "Jardim Teste",
    cidade: "Teste",
    estado: "Teste",
    complemento: "Rua Teste"
  }];

  ngOnInit(): void { //INICIANDO A LISTA DE CLIENTES COM O OBJETO CARREGADO DA API
    this.clienteServico = new ClienteServico(this.http)
    this.clientes = this.clienteTeste;//iniciando o cliente teste
    this.listaClientes()
  }

  private async listaClientes(){ //METODO QUE LISTA OS CLIENTES PEGANDO DA API JUNTO COM O 'CLIENTE SERVICO'
    this.clientes = await this.clienteServico.listarClientes();
    this.clientes = []
    console.log(this.clientes);
  }

  novoCliente(){
    this.router.navigateByUrl("clientes/novo")
  }

  async excluir(cliente:Cliente){
    if(confirm("Confirma ?")){
      await this.clienteServico.excluirClientePorId(cliente.id)
      this.clientes = await this.clienteServico.listarClientes()
      //this.clienteObserverService.atualizaQuantidade();
    }
  }
}
