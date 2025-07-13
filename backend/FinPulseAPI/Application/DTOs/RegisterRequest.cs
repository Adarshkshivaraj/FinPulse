using System;

namespace FinPulseAPI.Application.DTOs
{
    public class RegisterRequest
    {
        public required string LoginName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string MobileNumber { get; set; }
    }
}

