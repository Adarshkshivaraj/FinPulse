using Microsoft.EntityFrameworkCore;
using FinPulseAPI.Core.Entities;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace FinPulse.Infrastructure.Identity
{
    public class FinPulseDbContext : DbContext
    {
        public FinPulseDbContext(DbContextOptions<FinPulseDbContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }

        // Optional: override OnModelCreating if you want to configure entities
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.LoginName).IsRequired();
                entity.Property(u => u.Email).IsRequired();
                entity.Property(u => u.PasswordHash).IsRequired();
                entity.Property(u => u.Role).HasDefaultValue("User");
                entity.Property(u => u.MobileNumber).IsRequired();
            });
        }
    }
}
