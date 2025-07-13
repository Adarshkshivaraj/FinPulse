using System;
using FinPulseAPI.Application.DTOs;
using FinPulseAPI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinPulseAPI.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            await _authService.RegisterAsync(request);
            return Ok(new { message = "Registered successfully" });
        }
    }
}