import { Produto } from "../../modelo/produto";

export class LojaCarrinhoCompras {
 
  public produtos: Produto[] = [];

  public adicionarProduto(produto: Produto) {
    var produtoLocalStore = localStorage.getItem("produtoLocalStorage");

    if (!produtoLocalStore) {
      this.produtos.push(produto);
    }
    else {
      this.produtos = JSON.parse(produtoLocalStore);
      this.produtos.push(produto);
    }

    localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));

  }

  public obterProdutos(): Produto[] {

    if (localStorage.getItem("produtoLocalStorage")) {
      return JSON.parse(localStorage.getItem("produtoLocalStorage"));
    }

    return this.produtos;
  }

  public RemoverProduto(produto: Produto) {

    if (localStorage.getItem("produtoLocalStorage")) {
      this.produtos = JSON.parse(localStorage.getItem("produtoLocalStorage"));
      this.produtos = this.produtos.filter(x => x.id != produto.id);

      localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
    }
  }

  public atualizar(produto: Produto[]) {
    localStorage.setItem("produtoLocalStorage", JSON.stringify(produto));
  }

  public TemItensCarrinhoCompras(): boolean {

    var itens = this.obterProdutos();

    return itens.length > 0;
  }

}
