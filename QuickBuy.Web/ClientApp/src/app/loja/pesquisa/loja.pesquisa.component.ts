import { Component, OnInit } from "@angular/core"
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";

@Component({
  selector: "app-loja",
  templateUrl: "./loja.pesquisa.component.html",
  styleUrls: ["./loja.pesquisa.component.css"]
})

export class LojaPesquisaComponent implements OnInit{

  public produtos: Produto[];

  ngOnInit(): void {

  }

  constructor(private router: Router, private produtoServico: ProdutoServico) {
    this.produtoServico.obterTodos().
      subscribe
      (
        produtos =>
        {
          this.produtos = produtos;
        },
        e => {console.log(e.error) }
      )
  }

  public abrirProduto(produto: Produto) {
    sessionStorage.setItem("produtoDetalhes", JSON.stringify(produto));
    this.router.navigate(['/loja-detalhes-produto']);
  }

  //public deletar_produto(produto: Produto) {

  //  var retorno = confirm("Deseja realmente deletar o produto");

  //  if (retorno) {
  //    this.produtoServico.deletar(produto)
  //      .subscribe
  //      (
  //        p => {
  //          this.produtos = p;
  //        },
  //        e => {

  //        }
  //      )
  //  }
  //}

  //public editar_produto(produto: Produto) {

  //  sessionStorage.setItem("produtoSessao", JSON.stringify(produto));

  //  this.router.navigate(['/produto']);
  //}

}
