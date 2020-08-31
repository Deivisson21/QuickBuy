using Microsoft.EntityFrameworkCore;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoValor;
using QuickBuy.Repositorio.Config;

namespace QuickBuy.Repositorio.Contexto
{
    public class QuickBuyContexto: DbContext
    {
        public QuickBuyContexto (DbContextOptions options) : base(options)
        {

        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItensPedidos { get; set; }
        public DbSet<FormaPagamento> FormaPagamento { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoConfiguration());
            modelBuilder.ApplyConfiguration(new ItemPedidoConfiguration());
            modelBuilder.ApplyConfiguration(new FormaPagamentoConfiguration());

            //Carregar valores padrão para tabelas de forma de pagamento

            modelBuilder.Entity<FormaPagamento>().HasData(
            new FormaPagamento()  { Id = 1, Descricao = "Forma pagamento boleto", Nome = "Boleto" },
            new FormaPagamento()  { Id = 2, Descricao = "Forma pagamento cartão de crédito", Nome = "CartaoCredito" },
            new FormaPagamento()  { Id = 3, Descricao = "Forma pagamento depósito", Nome = "Deposito" });

            base.OnModelCreating(modelBuilder);
        }
    } 
}
