using System;
using FinPulseAPI.Core.Entities;

namespace FinPulseAPI.Application.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(ApplicationUser user);
    }
}

