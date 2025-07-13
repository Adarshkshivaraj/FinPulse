using FinPulseAPI.Application.DTOs;
using FinPulseAPI.Application.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OtpController : ControllerBase
{
    private readonly OtpService _otpService;
    private readonly SmsSender _smsSender;

    public OtpController(SmsSender smsSender, OtpService otpService)
    {
        _smsSender = smsSender;
        _otpService = otpService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
    {
        var otp = _otpService.GenerateOtp(request.MobileNumber);
        var success = await _smsSender.SendOtpAsync(request.MobileNumber, otp);

        if (success)
            return Ok(new { message = "OTP sent successfully" });
        else
            return StatusCode(500, new { error = "Failed to send OTP" });
    }

    [HttpPost("verify")]
    public IActionResult VerifyOtp([FromBody] VerifyOtpRequest request)
    {
        var isValid = _otpService.VerifyOtp(request.MobileNumber, request.Otp);

        if (isValid)
        {
            _otpService.ClearOtp(request.MobileNumber);
            return Ok(new { verified = true });
        }

        return BadRequest(new { verified = false, error = "Invalid OTP" });
    }

    [HttpGet("ping")]
    public IActionResult Ping() => Ok("OTP controller is active");
}
