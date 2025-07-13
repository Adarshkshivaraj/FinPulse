using System;
using System.Collections.Concurrent;

namespace FinPulseAPI.Application.Services
{
    public class OtpService
    {
        private static readonly ConcurrentDictionary<string, string> otpStore = new();

        public string GenerateOtp(string mobileNumber)
        {
            var otp = new Random().Next(100000, 999999).ToString();
            otpStore[mobileNumber] = otp;
            return otp;
        }

        public bool VerifyOtp(string mobileNumber, string otp)
        {
            return otpStore.TryGetValue(mobileNumber, out var storedOtp) && storedOtp == otp;
        }

        public void ClearOtp(string mobileNumber)
        {
            otpStore.TryRemove(mobileNumber, out _);
        }
    }
}

