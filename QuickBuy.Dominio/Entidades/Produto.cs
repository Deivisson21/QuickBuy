
using System.Collections.Generic;

namespace QuickBuy.Dominio.Entidades
{
    public class Produto:Entidade
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public string nomeArquivo { get; set; }
        public override void Validar()
        {
            if (string.IsNullOrEmpty(this.Nome))
                MensagemValidacao.Add("Nome deve ser informado.");

            if (string.IsNullOrEmpty(this.Descricao))
                MensagemValidacao.Add("Descrição deve ser informado.");

            if (this.Preco == 0)
                MensagemValidacao.Add("Preço deve ser informado.");
        }
    }
}
