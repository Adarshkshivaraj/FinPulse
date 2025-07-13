
using Microsoft.EntityFrameworkCore;
using FinPulseAPI.Application.Interfaces;
using FinPulseAPI.Core.Entities;
using System;

namespace FinPulse.Infrastructure.Identity
{
    public class UserRepository : IUserRepository
    {
        private readonly FinPulseDbContext _context;

        public UserRepository(FinPulseDbContext context)
        {
            _context = context;
        }

        public async Task<ApplicationUser?> FindByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task AddAsync(ApplicationUser user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<ApplicationUser> GetUserByMobileAsync(string mobileNumber)
        {
            return await _context.Users
                .Where(u => u.MobileNumber != null && u.MobileNumber == mobileNumber)
                .FirstOrDefaultAsync() ?? throw new InvalidOperationException("User not found.");
        }

        public async Task UpdateUserAsync(ApplicationUser user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
