import { Injectable, inject, Inject, OnInit } from "@angular/core"
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Produto } from "../../modelo/produto";

@Injectable({
  providedIn: "root"
})

export class ProdutoServico implements OnInit {
    
  private url: string;
  public produtos: Produto[];

  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.url = baseUrl;
  }
    ngOnInit(): void {
      this.produtos = [];
    }

  get headers(): HttpHeaders  {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public cadastrar(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.url + "api/produto", JSON.stringify(produto), { headers: this.headers });
  }

  public salvar(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.url + "api/produto/salvar", JSON.stringify(produto), {headers:this.headers});
  }

  public deletar(produto: Produto): Observable<Produto[]> {
    return this.http.post<Produto[]>(this.url + "api/produto/deletar", JSON.stringify(produto), {headers:this.headers});
  }

  public obterTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url + "api/produto");
  }

  public obterProduto(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(this.url + "api/produto/obterPorId");
  }

  public enviarArquivo(arquivo: File): Observable<string>  {

    const formData: FormData = new FormData();
    formData.append("arquivoEnviado", arquivo, arquivo.name);

    return this.http.post<string>(this.url + "api/produto/EnviarArquivo", formData);
  }

};
