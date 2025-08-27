using System;
namespace FinPulseAPI.Application.DTOs
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public string? LoginName { get; set; }
        public string? Password { get; set; }
    }
}

