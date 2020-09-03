import { Injectable, inject, Inject, OnInit } from "@angular/core"
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Produto } from "../../modelo/produto";
import { pedidos } from "../../modelo/pedido";

@Injectable({
  providedIn: "root"
})

export class PedidoServico implements OnInit {
    
  private url: string;
  public pedidos: pedidos [];
  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.url = baseUrl;
  }
    ngOnInit(): void {
      this.pedidos = [];
    }

  get headers(): HttpHeaders  {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public efetivarCompra(pedido: pedidos): Observable<number>{
    return this.http.post<number>(this.url + "api/pedido", JSON.stringify(pedido), { headers: this.headers });
  }

};
