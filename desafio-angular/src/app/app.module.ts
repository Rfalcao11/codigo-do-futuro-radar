import { DEFAULT_CURRENCY_CODE,LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { NovopedidoComponent } from './views/novopedido/novopedido.component';
import { NovoclienteComponent } from './views/novocliente/novocliente.component';
import { NovoprodutoComponent } from './views/novoproduto/novoproduto.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { ProdutosComponent } from './views/produtos/produtos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormatacaoPipe } from './pipes/formatacaoTelefone.pipe';
import { FormatacaoCpfPipe } from './pipes/formatacaoCpf.pipe';
import { FormatacaoCepPipe } from './pipes/formatacaoCep.pipe';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ChartType, GoogleChartsModule, GOOGLE_CHARTS_CONFIG } from 'angular-google-charts';
registerLocaleData(ptBr);



@NgModule({
  declarations: [
    //Aqui declaramos os componentes
    AppComponent,
    LoginComponent,
    HomeComponent,
    PedidosComponent,
    ClienteComponent,
    ProdutosComponent,
    NovopedidoComponent,
    NovoclienteComponent,
    NovoprodutoComponent,
    FormatacaoPipe,
    FormatacaoCpfPipe,
    FormatacaoCepPipe,
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
