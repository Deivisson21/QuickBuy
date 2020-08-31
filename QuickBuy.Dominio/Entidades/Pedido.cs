
using QuickBuy.Dominio.ObjetoValor;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }
        public DateTime DataPrevisaoEntrega { get; set; }
        public string CEP { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string EnderecoCompleto { get; set; }
        public string NumeroEndereco { get; set; }
        public virtual ICollection<ItemPedido> ItensPedido { get; set; }
        public int FormaPagamentoId{ get; set; }
        public virtual FormaPagamento FormaPagamento { get; set; }

        public override void Validar()
        {
            if (!ItensPedido.Any())
            {
                MensagemValidacao.Add("Não existe item para o pedido em questão" + this.Id);
            }
        }
    }
}
