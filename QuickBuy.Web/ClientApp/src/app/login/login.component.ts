import { Component } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioServico } from '../servicos/usuario/usuario.servico';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'login';
  public usuario;
  userAutenticado: boolean;
  private url_ativa: string;
  public mensagem: string;
  public ativa_spinner: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private usuarioServico: UsuarioServico) {
   
  }

  ngOnInit(): void
  {
    this.usuario = new Usuario();
    this.url_ativa = this.activatedRoute.snapshot.queryParams["returnUrl"];
  }
  entrar() {

    this.ativa_spinner = true;

    this.usuarioServico.verificarUsuario(this.usuario)
      .subscribe(
        usuario_json => {
          //console.log(data);
          this.usuarioServico.usuario = usuario_json;
          //sessionStorage.setItem("userAutenticado", "1");
          //sessionStorage.setItem("email-usuario", usuarioRetorno.email);

          this.router.navigate([this.url_ativa == undefined ? "/" : this.url_ativa]);
        },
        err => {
          //console.log(err.error);
          this.mensagem = err.error;
          this.ativa_spinner = false;
        }
      );

    //if (this.usuario.email == "deivisson.tecnico@gmail.com" && this.usuario.senha == "1234")
    //{
    //  sessionStorage.setItem("userAutenticado", "1");

    //  this.router.navigate([this.url_ativa == undefined ? "/" : this.url_ativa ]);
    //}
  }

}
