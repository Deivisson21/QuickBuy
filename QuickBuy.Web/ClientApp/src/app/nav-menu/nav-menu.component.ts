import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsuarioServico } from '../servicos/usuario/usuario.servico';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private router: Router, private usuarioServico: UsuarioServico) {
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

  sair() {
    this.usuarioServico.limpar_sessao();
    this.router.navigate(['/']);
  }

}