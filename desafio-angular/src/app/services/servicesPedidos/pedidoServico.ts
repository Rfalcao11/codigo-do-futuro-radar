import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Pedido } from "src/app/modules/modeloPedidos";
import { environment } from "src/environments/environment";


export class PedidoServico{
    constructor(private http:HttpClient) { }

    public async listarPedidos(): Promise<Pedido[] | undefined> {
        let pedido:Pedido[] | undefined = await firstValueFrom(this.http.get<Pedido[]>(`${environment.API}/pedidos`))
        return pedido;
    }

    public async criarPedido(pedido:Pedido): Promise<Pedido | undefined> {
        let pedidoRest:Pedido | undefined = await firstValueFrom(this.http.post<Pedido>(`${environment.API}/pedidos/`, pedido))
        console.log(pedido);
        return pedidoRest;
    }

    public async editarPedido(pedido:Pedido): Promise<Pedido | undefined> {
        let pedidoRest:Pedido | undefined = await firstValueFrom(this.http.put<Pedido>(`${environment.API}/pedidos/${pedido.id}`, pedido))
        return pedidoRest;
    }

    public async buscarPedidoPorId(id:Number): Promise<Pedido | undefined> {
        return await firstValueFrom(this.http.get<Pedido | undefined>(`${environment.API}/pedidos/${id}`))
    }

    public excluirpedidoPorId(id:Number) {
        firstValueFrom(this.http.delete(`${environment.API}/pedidos/${id}`))
    }
}