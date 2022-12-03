import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modules/modeloCliente';
import { ClienteServico } from 'src/app/services/serviceClientes/clienteServico';

@Component({
  selector: 'app-novocliente',
  templateUrl: './novocliente.component.html',
  styleUrls: ['./novocliente.component.css']
})
export class NovoclienteComponent implements OnInit {


  constructor(
    private router:Router,
    private http:HttpClient,
    private routerParams: ActivatedRoute,

  ) { }

  private clienteServico:ClienteServico = {} as ClienteServico
  public titulo:String = "Novo Cliente"
  public cliente:Cliente | undefined = {} as Cliente
  
  ngOnInit(): void {
    this.clienteServico = new ClienteServico(this.http)
    let id:Number = this.routerParams.snapshot.params['id']
    if(id){
      this.editaCliente(id)
    }
  }

  private async editaCliente(id: Number) {
    this.titulo = "Editar Cliente"
    this.cliente = await this.clienteServico.buscarClientePorId(id)
  
    console.log(this.cliente)
  }

  

  salvar(){
    if(this.cliente && this.cliente.id > 0){
      this.clienteServico.editarCliente(this.cliente)
    }
    else{
      this.clienteServico.criarCliente({
        id: 0, 
        nome: this.cliente?.nome ,
        telefone: this.cliente?.telefone,
        email: this.cliente?.email,
        cpf: this.cliente?.cpf,
        cep: this.cliente?.cep,
        logradouro: this.cliente?.logradouro,
        numero: this.cliente?.numero,
        bairro: this.cliente?.bairro,
        cidade: this.cliente?.cidade,
        estado: this.cliente?.estado,
        complemento: this.cliente?.complemento
      });
    }
    this.router.navigateByUrl("/clientes")
  }

  public cancelar():void{
    this.router.navigateByUrl('/clientes');
    }

  public tele:String = "merda"

}
