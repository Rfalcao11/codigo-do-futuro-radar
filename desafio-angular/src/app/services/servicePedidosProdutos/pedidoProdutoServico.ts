import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { PedidoProduto } from "src/app/modules/modeloPedidoProduto";
import { environment } from "src/environments/environment";

export class PedidoProdutoServico{

    constructor(private http:HttpClient) { }

    public async listarPedidoProduto(): Promise<PedidoProduto[] | undefined> {
        let pedidoProduto:PedidoProduto[] | undefined = await firstValueFrom(this.http.get<PedidoProduto[]>(`${environment.API}/pedidosProdutos`))
        return pedidoProduto;
    }

    public async criarPedidoProduto(pedidoProduto:PedidoProduto): Promise<PedidoProduto | undefined> {
        let pedidoProdutoRest:PedidoProduto | undefined = await firstValueFrom(this.http.post<PedidoProduto>(`${environment.API}/pedidosProdutos/`, pedidoProduto))
        console.log(pedidoProduto);
        return pedidoProdutoRest;
    }

    public async editarPedidoProduto(pedidoProduto:PedidoProduto): Promise<PedidoProduto | undefined> {
        let pedidoProdutoRest:PedidoProduto | undefined = await firstValueFrom(this.http.put<PedidoProduto>(`${environment.API}/pedidosProdutos/${pedidoProduto.id}`, pedidoProduto))
        return pedidoProdutoRest;
    }

    public async buscarPedidoProdutoPorId(id:Number): Promise<PedidoProduto | undefined> {
        return await firstValueFrom(this.http.get<PedidoProduto | undefined>(`${environment.API}/pedidosProdutos/${id}`))
    }

    public excluirPedidoProdutoPorId(id:Number) {
        firstValueFrom(this.http.delete(`${environment.API}/pedidoProduto/${id}`))
    }
    
}