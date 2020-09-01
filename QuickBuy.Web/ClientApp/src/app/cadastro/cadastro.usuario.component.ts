import { Component, OnInit } from "@angular/core"
import { Usuario } from "../modelo/usuario"
import { UsuarioServico } from "../servicos/usuario/usuario.servico";

@Component({
  selector: "cadastro-usuario",
  templateUrl: "./cadastro.usuario.component.html",
  styleUrls: ["./cadastro.usuario.component.css"]
})

export class CadastroUsuarioComponent implements OnInit {

  public usuario: Usuario;
  public ativa_spinner: boolean;
  public mensagem: string;
  public usuario_cadastrado: boolean;

  constructor(private usuarioServico: UsuarioServico) {

  }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  public cadastrar():void {
    this.ativa_spinner = true;
    this.usuarioServico.salvarUsuario(this.usuario).subscribe(
      usuario_json => {
        this.mensagem = "";
        this.usuario_cadastrado = true;
        this.ativa_spinner = false;
      },
      err=> {
        this.mensagem = err.error;
        this.ativa_spinner = false;
      }
    );
  }

};
