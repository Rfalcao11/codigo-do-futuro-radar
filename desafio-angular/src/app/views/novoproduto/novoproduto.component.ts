import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/modules/modeloProduto';
import { ProdutoServico } from 'src/app/services/servicesProdutos/produtoServico';

@Component({
  selector: 'app-novoproduto',
  templateUrl: './novoproduto.component.html',
  styleUrls: ['./novoproduto.component.css']
})
export class NovoprodutoComponent implements OnInit {

  constructor( 
    private router:Router,
    private http:HttpClient,
    private routerParams: ActivatedRoute,
    ) { }

    
  private produtoServico:ProdutoServico = {} as ProdutoServico
  public titulo:String = "Novo Produto"
  public produto:Produto | undefined = {} as Produto

  ngOnInit(): void {
    this.produtoServico = new ProdutoServico(this.http)
    let id:Number = this.routerParams.snapshot.params['id']
    if(id){
      this.editaProduto(id)
    }
  }

  private async editaProduto(id: Number) {
    this.titulo = "Editar Produto"
    this.produto = await this.produtoServico.buscarProdutoPorId(id)
    console.log(this.produto)
  }

  salvar(){
    if(this.produto && this.produto.id > 0){
      this.produtoServico.editarProduto(this.produto)
    }
    else{
      this.produtoServico.criarProduto({
        id: 0, 
        nome: this.produto?.nome,
        desc: this.produto?.desc,
        valor: this.produto?.valor,
        qtdEstoque: this.produto?.qtdEstoque,
      });
    }
    this.router.navigateByUrl("/produtos")
  }


  public cancelar():void{
    this.router.navigateByUrl('/produtos');
    }

}
