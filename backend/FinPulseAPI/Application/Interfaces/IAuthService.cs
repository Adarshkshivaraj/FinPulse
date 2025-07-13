using System;
using FinPulseAPI.Application.DTOs;

namespace FinPulseAPI.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task RegisterAsync(RegisterRequest request);
    }
}

