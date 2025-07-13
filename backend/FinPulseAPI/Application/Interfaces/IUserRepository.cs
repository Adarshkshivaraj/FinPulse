using System;
using FinPulseAPI.Core.Entities;

namespace FinPulseAPI.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<ApplicationUser?> FindByEmailAsync(string email);
        Task AddAsync(ApplicationUser user);
        Task<bool> UserExistsAsync(string email);

        Task<ApplicationUser> GetUserByMobileAsync(string mobileNumber);
        Task UpdateUserAsync(ApplicationUser user);
    }

}

