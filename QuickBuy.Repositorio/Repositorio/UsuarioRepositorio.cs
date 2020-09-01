using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Contexto;
using System.Linq;

namespace QuickBuy.Repositorio.Repositorio
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepositorio
    {
        public UsuarioRepositorio(QuickBuyContexto quickBuyContexto): base(quickBuyContexto)
        {

        }

        public Usuario Obter(string email, string senha)
        {
            return QuickBuyContexto.Usuarios.FirstOrDefault(user => user.Email.Equals(email) && user.Senha.Equals(senha));
        }

        public Usuario Obter(string email)
        {
            return QuickBuyContexto.Usuarios.FirstOrDefault(user => user.Email.Equals(email));
        }
    }
}
