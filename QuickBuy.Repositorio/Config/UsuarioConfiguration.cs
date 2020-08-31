using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Repositorio.Config
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(x => x.Nome)
               .IsRequired()
               .HasMaxLength(500);

            builder.Property(x => x.Senha)
              .IsRequired()
              .HasMaxLength(1000);

            builder.Property(x => x.SobreNome)
              .IsRequired()
              .HasMaxLength(500);

            builder
                .HasMany(u => u.Pedidos)
                .WithOne(p => p.Usuario);
        }
    }
}
