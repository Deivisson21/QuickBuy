import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { PedidoServico } from "../../../servicos/pedido/pedido.servico";
import { pedidos } from "../../../modelo/pedido";
import { Usuario } from "../../../modelo/usuario";

@Component({
  selector: "app-loja-listaPedidos",
  templateUrl: "./loja.lista.pedidos.component.html",
  styleUrls: ["./loja.lista.pedidos.component.css"]
})

export class lojalistaPedidosComponent implements OnInit{

  public pedidos: pedidos[]
  public usuario: Usuario;
  public exibirPedido: boolean;

  constructor(private router: Router, private pedidoServico: PedidoServico) {

  }

  ngOnInit(): void {

    this.usuario = JSON.parse(sessionStorage.getItem("Usuario_Pedido"));

    if (this.usuario.id > 0) {

      this.pedidoServico.ObterTodosPedidos(this.usuario.id.toString())
        .subscribe(
          p => {
            if (p.length != 0) {
              this.exibirPedido = true;
            }
            else {
              this.exibirPedido = false;
            }
            console.log(p);
            this.pedidos = p

          },
          e => {
            console.log(e.error);
          }
        )
    }
   
  }

 
}
