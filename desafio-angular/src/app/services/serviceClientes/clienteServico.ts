import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Cliente } from "src/app/modules/modeloCliente";
import { environment } from "src/environments/environment";


export class ClienteServico{

    constructor(private http:HttpClient) { }

    public async listarClientes(): Promise<Cliente[] | undefined> {
        let clientes:Cliente[] | undefined = await firstValueFrom(this.http.get<Cliente[]>(`${environment.API}/clientes`))
        return clientes;
    }

    public async criarCliente(cliente:Cliente): Promise<Cliente | undefined> {
        let clienteRest:Cliente | undefined = await firstValueFrom(this.http.post<Cliente>(`${environment.API}/clientes/`, cliente))
        console.log(cliente);
        return clienteRest;
    }

    public async editarCliente(cliente:Cliente): Promise<Cliente | undefined> {
        let clienteRest:Cliente | undefined = await firstValueFrom(this.http.put<Cliente>(`${environment.API}/clientes/${cliente.id}`, cliente))
        return clienteRest;
    }

    public async buscarClientePorId(id:Number): Promise<Cliente | undefined> {
        return await firstValueFrom(this.http.get<Cliente | undefined>(`${environment.API}/clientes/${id}`))
    }

    public async buscarClientePorCPF(cpf:Number): Promise<Cliente | undefined> {
        return await firstValueFrom(this.http.get<Cliente | undefined>(`${environment.API}/clientesCPF/${cpf}`))
    }

    public excluirClientePorId(id:Number) {
        firstValueFrom(this.http.delete(`${environment.API}/clientes/${id}`))
    }
    
}