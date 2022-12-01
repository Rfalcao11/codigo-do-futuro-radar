import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { NovoclienteComponent } from './views/novocliente/novocliente.component';
import { NovopedidoComponent } from './views/novopedido/novopedido.component';
import { NovoprodutoComponent } from './views/novoproduto/novoproduto.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { ProdutosComponent } from './views/produtos/produtos.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'pedidos/novopedido', component: NovopedidoComponent},
  {path: 'clientes/novocliente', component: NovoclienteComponent},
  {path: 'produtos/novoproduto', component: NovoprodutoComponent},
  {path:'**', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
