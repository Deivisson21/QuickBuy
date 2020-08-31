using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Repositorio.Repositorio
{
    public class BaseRepositorio<TEntity> : IBaseRepositorio<TEntity> where TEntity : class
    {
        protected readonly QuickBuyContexto QuickBuyContexto;
        public BaseRepositorio(QuickBuyContexto quickBuyContexto)
        {
            QuickBuyContexto = quickBuyContexto;
        }
        public void Adicionar(TEntity entity)
        {
            QuickBuyContexto.Set<TEntity>().Add(entity);
            QuickBuyContexto.SaveChanges();
        }

        public void Atualizar(TEntity entity)
        {
            QuickBuyContexto.Set<TEntity>().Update(entity);
            QuickBuyContexto.SaveChanges();
        }

        public void Dispose()
        {
            QuickBuyContexto.Dispose();
        }

        public TEntity ObterPorId(int Id)
        {
            return QuickBuyContexto.Set<TEntity>().Find(Id);
        }

        public IEnumerable<TEntity> ObterTodos()
        {
            return QuickBuyContexto.Set<TEntity>().ToList();
        }
        public void remover(TEntity entity)
        {
            QuickBuyContexto.Set<TEntity>().Remove(entity);
            QuickBuyContexto.SaveChanges();
        }
    }
}
