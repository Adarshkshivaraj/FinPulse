using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace FinPulseAPI.Application.Services
{
    public class SmsSender
    {
        private readonly IConfiguration _config;

        public SmsSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task<bool> SendOtpAsync(string toPhoneNumber, string otp)
        {
            var accountSid = _config["Twilio:AccountSid"];
            var authToken = _config["Twilio:AuthToken"];
            var fromNumber = _config["Twilio:FromNumber"];

            TwilioClient.Init(accountSid, authToken);

            var message = await MessageResource.CreateAsync(
                to: new PhoneNumber($"+91{toPhoneNumber}"),
                from: new PhoneNumber(fromNumber),
                body: $"Your OTP is {otp}");

            return message.ErrorCode == null;
        }
    }
}