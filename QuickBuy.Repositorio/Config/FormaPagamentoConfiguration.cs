using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoValor;
using System;

namespace QuickBuy.Repositorio.Config
{
    public class FormaPagamentoConfiguration : IEntityTypeConfiguration<FormaPagamento>
    {
        public void Configure(EntityTypeBuilder<FormaPagamento> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Nome)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasMaxLength(500);
        }
    }
}
