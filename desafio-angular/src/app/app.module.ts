import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { NovopedidoComponent } from './views/novopedido/novopedido.component';
import { NovoclienteComponent } from './views/novocliente/novocliente.component';
import { NovoprodutoComponent } from './views/novoproduto/novoproduto.component';


@NgModule({
  declarations: [
    //Aqui declaramos os componentes
    AppComponent,
    LoginComponent,
    HomeComponent,
    PedidosComponent,
    NovopedidoComponent,
    NovoclienteComponent,
    NovoprodutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
