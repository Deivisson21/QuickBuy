import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProdutoComponent } from './produto/produto.component';
import { LoginComponent } from './login/login.component';
import { GuardaRotas } from './autorizacao/guarda.rotas';
import { UsuarioServico } from './servicos/usuario/usuario.servico';
import { CadastroUsuarioComponent } from './cadastro/cadastro.usuario.component';
import { ProdutoServico } from './servicos/produto/produto.servico';
import { PesquisaProdutoComponent } from './produto/pesquisa/pesquisa.produto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProdutoComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    PesquisaProdutoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'produto', component: ProdutoComponent /* , canActivate: [GuardaRotas]*/ },
      { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
      { path: 'pesquisa-produto', component: PesquisaProdutoComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [UsuarioServico,ProdutoServico],
  bootstrap: [AppComponent]
})
export class AppModule { }
