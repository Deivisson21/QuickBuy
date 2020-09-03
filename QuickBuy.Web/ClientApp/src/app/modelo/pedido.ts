import { itemPedido } from "./itemPedido";
import { OnInit } from "@angular/core";

export class pedidos{
  public id: number;
  public usuarioId: number
  public dataPedido: Date;
  public dataPrevisaoEntrega: Date;
  public cep: string;
  public estado: string;
  public cidade: string;
  public enderecoCompleto: string;
  public numeroEndereco: string;
  public formapagamentoId: number;
  public itensPedido: itemPedido[];

  constructor() {
    this.itensPedido = [];
  } 
};
