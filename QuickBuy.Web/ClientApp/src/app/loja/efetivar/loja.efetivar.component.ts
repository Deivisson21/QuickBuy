import { Component, OnInit } from "@angular/core"
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { forEach } from "@angular/router/src/utils/collection";
import { pedidos } from "../../modelo/pedido";

@Component({
  selector: "app-loja-efetivar",
  templateUrl: "./loja.efetivar.component.html",
  styleUrls: ["./loja.efetivar.component.css"]
})

export class LojaEfetivarComponent implements OnInit{

  public produtos: Produto[];
  public carrinhoComprar: LojaCarrinhoCompras;
  public total: number;

  ngOnInit(): void {
    this.carrinhoComprar = new LojaCarrinhoCompras();
    this.produtos = this.carrinhoComprar.obterProdutos();

    this.atualizar_Total();
  }

  constructor(private router: Router, private produtoServico: ProdutoServico) {
  
  }

  public atualizarPreco(produto: Produto, qtd: number) {

    if (qtd <= 0) {
      qtd = 1;
      produto.quantidade = qtd;
    }

    if (!produto.precoOriginal) {
      produto.precoOriginal = produto.preco;
    }

    produto.preco = produto.precoOriginal * qtd;

    this.carrinhoComprar.atualizar(this.produtos);

    this.atualizar_Total();
  }

  public remover_produto_carrinho(produto: Produto) {
    this.carrinhoComprar.RemoverProduto(produto);
    this.produtos = this.carrinhoComprar.obterProdutos();

    this.atualizar_Total()
  }

  public atualizar_Total() {
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
  }

  public efetivar_compras() {
    let pedido = new pedidos();
  }

}
