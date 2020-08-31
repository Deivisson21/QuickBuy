using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Repositorio.Config
{
    public class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.DataPedido)
                .IsRequired()
                .HasColumnType("DateTime");

            builder.Property(x => x.DataPrevisaoEntrega)
               .IsRequired()
               .HasColumnType("DateTime");

            builder.Property(x => x.CEP)
              .IsRequired()
              .HasMaxLength(9);

            builder.Property(x => x.Cidade)
              .IsRequired()
              .HasMaxLength(50);

            builder.Property(x => x.Estado)
              .IsRequired()
              .HasMaxLength(50);

            builder.Property(x => x.EnderecoCompleto)
              .IsRequired()
              .HasMaxLength(500);

               builder.Property(x => x.NumeroEndereco)
              .IsRequired()
              .HasMaxLength(11);
        }
    }
}
