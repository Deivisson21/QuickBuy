import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsuarioServico } from '../servicos/usuario/usuario.servico';
import { LojaCarrinhoCompras } from '../loja/carrinho-compras/loja.carrinho.compras.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public carrinhoComprar : LojaCarrinhoCompras;

  constructor(private router: Router, private usuarioServico: UsuarioServico) {
  }
    ngOnInit(): void {
        this.carrinhoComprar = new LojaCarrinhoCompras();
    }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public usuarioLogado(): boolean {

    return this.usuarioServico.usuario_autenticado();
  }

  public usuarioAdministrador(): boolean {

    return this.usuarioServico.usuario_administrador();
  }


  sair() {
    this.usuarioServico.limpar_sessao();
    this.router.navigate(['/']);
  }

  get usuario() {
    return this.usuarioServico.usuario;
  }

  public exibirCarrinhoCompras():boolean {
    return this.carrinhoComprar.TemItensCarrinhoCompras();
  }

}
