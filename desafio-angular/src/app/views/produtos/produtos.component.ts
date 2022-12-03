import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/modules/modeloProduto';
import { ProdutoServico } from 'src/app/services/servicesProdutos/produtoServico';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

  public produtos:Produto[] | undefined = []
  private produtoServico:ProdutoServico = {} as ProdutoServico 

  ngOnInit(): void {
    this.produtoServico = new ProdutoServico(this.http)
    this.listaProdutos()
  }

  
  private async listaProdutos(){ //METODO QUE LISTA OS PRODUTOS PEGANDO DA API JUNTO COM O 'PRODUTO SERVICO'
    this.produtos = await this.produtoServico.listarProdutos();
  }

  novoProduto(){
    this.router.navigateByUrl("produtos/novo")
  }

  editarProduto(id:Number){
    this.router.navigateByUrl(`produtos/novo/${id}`)
  }

  

}
