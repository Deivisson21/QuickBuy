import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Produto } from "../modelo/produto";

@Component({
  selector: "produto",
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {

  produto: Produto;

  constructor(private produtoServico: ProdutoServico) {

  }
  ngOnInit(): void {
    this.produto = new Produto;
  }

  public cadastrar() {
    this.produtoServico.cadastrar(this.produto)
      .subscribe(
        pro => { console.log(pro); },
        err => { console.log(err.error); }
    )
  };

};
