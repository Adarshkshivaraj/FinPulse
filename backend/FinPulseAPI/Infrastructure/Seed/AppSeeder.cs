using System;
using FinPulse.Infrastructure.Identity;
using FinPulseAPI.Core.Entities;

namespace FinPulseAPI.Infrastructure.Seed
{
    public class AppSeeder
    {
        public async Task SeedAdminUserAsync(FinPulseDbContext context)
        {
            var email = "adarsh@example.com";
            var plainPassword = "YourStrongPassword123";
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(plainPassword);

            if (!context.Users.Any(u => u.Email == email))
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    Email = email,
                    PasswordHash = passwordHash,
                    Role = "Admin"
                };

                context.Users.Add(user);
                await context.SaveChangesAsync();
            }
        }
    }

}

