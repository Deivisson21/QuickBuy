using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Repositorio.Config
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(x => x.Nome)
               .IsRequired()
               .HasMaxLength(500);

            builder.Property(x => x.Preco)
              .IsRequired()
              .HasColumnType("decimal(19,4)");

            builder.Property(x => x.nomeArquivo)
                .HasMaxLength(1000);

        }
    }
}
