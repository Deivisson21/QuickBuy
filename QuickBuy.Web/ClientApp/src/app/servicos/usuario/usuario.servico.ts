import { Injectable, inject, Inject } from "@angular/core"
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Usuario } from "../../modelo/usuario";

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

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
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

  public verificarUsuario(usuario: Usuario): Observable<Usuario>
  {
    return this.http.post<Usuario>(this.url + "api/usuario/verificarUsuario", JSON.stringify(usuario), { headers:this.headers });
  }

  public salvarUsuario(usuario: Usuario): Observable<Usuario>
  {
    return this.http.post<Usuario>(this.url + "api/usuario", JSON.stringify(usuario), { headers: this.headers });
  }

};
