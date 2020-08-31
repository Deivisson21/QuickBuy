
using System;
using System.Collections;

namespace QuickBuy.Dominio.Entidades
{
    public class ItemPedido: Entidade
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public virtual Produto Produto { get; set; }
        public int Quatidade { get; set; }

        public override void Validar()
        {
            throw new NotImplementedException();
        }
    }
}
