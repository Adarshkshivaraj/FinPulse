using System;
using FinPulseAPI.Application.DTOs;
using FinPulseAPI.Application.Interfaces;
using FinPulseAPI.Auth;
using FinPulseAPI.Core.Entities;

namespace FinPulseAPI.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repo;
        private readonly IJwtTokenGenerator _tokenGen;

        public AuthService(IUserRepository repo, IJwtTokenGenerator tokenGen)
        {
            _repo = repo;
            _tokenGen = tokenGen;
        }

        public async Task<AuthResponse> LoginAsync(DTOs.LoginRequest request)
        {
            var user = await _repo.FindByEmailAsync(request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials");

            var token = _tokenGen.GenerateToken(user);
            return new AuthResponse { Token = token, Role = user.Role };
        }

        public async Task RegisterAsync(DTOs.RegisterRequest request)
        {
            var user = new ApplicationUser
            {
                LoginName = request.LoginName,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                MobileNumber = request.MobileNumber
            };

            await _repo.AddAsync(user);
        }
    }
}

