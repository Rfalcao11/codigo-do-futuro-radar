import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { LoginComponent } from './views/login/login.component';
import { NovoclienteComponent } from './views/novocliente/novocliente.component';
import { NovopedidoComponent } from './views/novopedido/novopedido.component';
import { NovoprodutoComponent } from './views/novoproduto/novoproduto.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { ProdutosComponent } from './views/produtos/produtos.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'clientes/novo', component: NovoclienteComponent },
  {path: 'clientes/novo/:id', component: NovoclienteComponent },
  {path: 'pedidos/novo', component: NovopedidoComponent},
  {path: 'pedidos/novo/:id', component: NovopedidoComponent},
  {path: 'produtos/novo', component: NovoprodutoComponent},
  {path: 'produtos/novo/:id', component: NovoprodutoComponent},
  {path:'**', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
