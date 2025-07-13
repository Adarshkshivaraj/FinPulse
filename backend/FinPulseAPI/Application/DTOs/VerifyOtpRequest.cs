using System;
namespace FinPulseAPI.Application.DTOs
{
    public class VerifyOtpRequest
    {
        public string MobileNumber { get; set; } = string.Empty;
        public string Otp { get; set; } = string.Empty;
    }
}

