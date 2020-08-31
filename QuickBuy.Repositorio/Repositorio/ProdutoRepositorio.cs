using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Contexto;

namespace QuickBuy.Repositorio.Repositorio
{
    public class ProdutoRepositorio : BaseRepositorio<Produto>, IProdutoRepositorio
    {
        public ProdutoRepositorio(QuickBuyContexto quickBuyContexto) : base(quickBuyContexto)
        {

        }
    }
}
