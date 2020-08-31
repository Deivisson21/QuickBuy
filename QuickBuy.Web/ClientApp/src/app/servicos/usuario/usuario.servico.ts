import { Injectable, inject, Inject } from "@angular/core"
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Usuario } from "../../modelo/usuario";
import { QUERY_READ_TEMPLATE_REF } from "@angular/core/src/render3";

@Injectable({
  providedIn: "root"
})

export class UsuarioServico {

  private url: string;
  private _usuario: Usuario;

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("userAutenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  get usuario():Usuario {
    let usuario_json = sessionStorage.getItem("userAutenticado");
    this._usuario = JSON.parse(usuario_json);
    return this._usuario;
  }

  public usuario_autenticado(): boolean {
    return this._usuario != null && this._usuario.email != ""
      && this._usuario.senha != "";
  }

  public limpar_sessao() {
    sessionStorage.setItem("userAutenticado", "");
    this._usuario = null;
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.url = baseUrl;
  }

  public verificarUsuario(usuario: Usuario): Observable<Usuario> {

    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      email: usuario.email,
      senha: usuario.senha
    }

    return this.http.post<Usuario>(this.url + "api/usuario/verificarUsuario", body, { headers });
  }

};
