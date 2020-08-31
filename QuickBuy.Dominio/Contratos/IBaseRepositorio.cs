


using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Dominio.Contratos
{
    public interface IBaseRepositorio<TEntity>: IDisposable where TEntity : class
    {
        void Adicionar(TEntity entity);
        TEntity ObterPorId(int Id);
        IEnumerable<TEntity> ObterTodos();
        void Atualizar(TEntity entity);
        void remover(TEntity entity);
    }
}
