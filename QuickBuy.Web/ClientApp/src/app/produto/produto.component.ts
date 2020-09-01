import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Produto } from "../modelo/produto";
import { Route, Router } from "@angular/router";

@Component({
  selector: "produto",
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {

  produto: Produto;
  public arquivo: File;
  public ativar_spinner: boolean;
  public mensagem: string;
  public _nomeArquivo: string;

  constructor(private router: Router, private produtoServico: ProdutoServico) {

  }

  ngOnInit(): void {

    this.produto = new Produto;

    if (sessionStorage.getItem("produtoSessao"))
    {
      this.produto = JSON.parse(sessionStorage.getItem("produtoSessao"));
    }
  }

  public cadastrar() {
    this.ativar_spinner = true;
    this.produtoServico.cadastrar(this.produto)
      .subscribe(
        pro => {
          console.log(pro);
          this.mensagem = "Produto cadastrado com sucesso!";
          this.ativar_spinner = false;
          this.router.navigate(['./pesquisa-produto']);
        },
        err => {
          console.log(err.error);
          this.mensagem = err.error;
          this.ativar_spinner = false;
        }
    )
  };

  public enviar_arquivo(files: FileList) {

    this.ativar_spinner = true;
    this.arquivo = files.item(0);

    this.produtoServico.enviarArquivo(this.arquivo)
      .subscribe(
        nomeArquivo => {
          this.produto.nomeArquivo = nomeArquivo;
          this._nomeArquivo = nomeArquivo;
          this.ativar_spinner = false;
          console.log(nomeArquivo)
        },
        e => {console.log(e.error)}
      );
  }
};
