import { Component, OnInit } from "@angular/core"
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";

@Component({
  selector: "pesquisa-produto",
  templateUrl: "./pesquisa.produto.component.html",
  styleUrls: ["./pesquisa.produto.component.css"]
})

export class PesquisaProdutoComponent implements OnInit{

  public produtos: Produto[];

  ngOnInit(): void {

  }

  constructor(private router: Router, private produtoServico: ProdutoServico) {
    produtoServico.obterTodos().
      subscribe
      (
        produtos =>
        {
          this.produtos = produtos;
        },
        e => { }
      )
  }

  public add_produto() {

    this.router.navigate(['/produto']);
  }

  public deletar_produto(produto: Produto) {

    var retorno = confirm("Deseja realmente deletar o produto");

    if (retorno) {
      this.produtoServico.deletar(produto)
        .subscribe
        (
          p => {
            this.produtos = p;
          },
          e => {

          }
        )
    }
  }

  public editar_produto(produto: Produto) {

    sessionStorage.setItem("produtoSessao", JSON.stringify(produto));

    this.router.navigate(['/produto']);
  }

}
