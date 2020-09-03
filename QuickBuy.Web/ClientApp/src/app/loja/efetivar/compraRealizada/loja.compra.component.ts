import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";

@Component({
  selector: "app-loja-compra",
  templateUrl: "./loja.compra.component.html",
  styleUrls: ["./loja.compra.component.css"]
})

export class LojaCompraComponent implements OnInit{

  public pedidoId: string;
 
  ngOnInit(): void {
    this.pedidoId = sessionStorage.getItem("pedidoId");
  }

  constructor(private router: Router) {
  
  }
}
