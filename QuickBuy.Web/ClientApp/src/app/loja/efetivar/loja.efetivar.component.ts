import { Component, OnInit } from "@angular/core"
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { forEach } from "@angular/router/src/utils/collection";
import { pedidos } from "../../modelo/pedido";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { itemPedido } from "../../modelo/itemPedido";
import { PedidoServico } from "../../servicos/pedido/pedido.servico";

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

  constructor(private router: Router, private pedidoServico: PedidoServico, private usuarioServico: UsuarioServico) {
  
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

    if (this.produtos.length <= 0)
    {
      this.router.navigate(['/']);
    }
      

    this.atualizar_Total()
  }

  public atualizar_Total() {
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
  }

  public criarPedido(): pedidos {
    let pedido = new pedidos();

    pedido.usuarioId = this.usuarioServico.usuario.id;
    pedido.cep = "29169693";
    pedido.cidade = "Serra";
    pedido.enderecoCompleto = "Rua Pinheiro N33";
    pedido.estado = "ES";
    pedido.formapagamentoId = 2;
    pedido.numeroEndereco = "33";
    this.produtos = this.carrinhoComprar.obterProdutos();

    for (let produto of this.produtos) {
      let itemPedidos = new itemPedido();
      itemPedidos.produtoId = produto.id;
      itemPedidos.quatidade = !produto.quantidade ? 1 : produto.quantidade;

      pedido.itensPedido.push(itemPedidos);

    }

    return pedido;
  }

  public efetivar_compras() {

    let pedido = this.criarPedido();
    this.pedidoServico.efetivarCompra(pedido)
      .subscribe(
        p =>
        {
          console.log(p);
          sessionStorage.setItem("pedidoId", p.toString());
          this.produtos = [];
          this.carrinhoComprar.limparProdutosCarrinho();
          this.router.navigate(['/compra-realizada']);
        },
        e =>
        {
          console.log(e);
        }
      ) 
  }

}
