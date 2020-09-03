import { Component, OnInit } from "@angular/core"
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";

@Component({
  selector: "app-loja-detalhes-produto",
  templateUrl: "./detalhes.produto.component.html",
  styleUrls: ["./detalhes.produto.component.css"]
})

export class DetalhesProdutoComponent implements OnInit{

  public produtos: Produto;
  public carrinhoCompras: LojaCarrinhoCompras;

  ngOnInit(): void {
     this.carrinhoCompras = new LojaCarrinhoCompras();

    if (sessionStorage.getItem("produtoDetalhes")) {
      this.produtos = JSON.parse(sessionStorage.getItem("produtoDetalhes"));
    }
  }

  constructor(private router: Router, private produtoServico: ProdutoServico) {
   
  }

  public comprar() {

    this.carrinhoCompras.adicionarProduto(this.produtos);
    this.router.navigate(['./loja-efetivar']);

  }

}
