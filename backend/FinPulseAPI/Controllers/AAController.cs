using Microsoft.AspNetCore.Mvc;
using finPulse.Interfaces;
using finPulse.Models.AA;
using finPulse.Models;
using Microsoft.EntityFrameworkCore;
using FinPulseAPI.Application.Interfaces;

namespace finPulse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AAController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IAAService _aaService;

        public AAController(IUserRepository userRepo, IAAService aaService)
        {
            _userRepo = userRepo;
            _aaService = aaService;
        }

        [HttpPost("start-consent")]
        public async Task<IActionResult> StartConsent([FromBody] string mobileNumber)
        {
            var response = await _aaService.StartConsent(mobileNumber);
            var user = await _userRepo.GetUserByMobileAsync(mobileNumber);

            if (user != null)
            {
                user.ConsentHandle = response.ConsentHandle;
                await _userRepo.UpdateUserAsync(user);
            }

            return Ok(response);
        }

        [HttpGet("accounts")]
        public async Task<IActionResult> GetAccounts([FromQuery] string mobileNumber)
        {
            var user = await _userRepo.GetUserByMobileAsync(mobileNumber);
            if (user == null || string.IsNullOrEmpty(user.ConsentHandle))
                return NotFound("Consent not found");

            var accounts = await _aaService.GetAccounts(user.ConsentHandle);

            if (accounts?.Accounts != null && accounts.Accounts.Any())
            {
                user.BankAccountId = accounts.Accounts[0].AccountId;
                await _userRepo.UpdateUserAsync(user);
            }
            
            return Ok(accounts);
        }

        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions([FromQuery] string mobileNumber)
        {
            var user = await _userRepo.GetUserByMobileAsync(mobileNumber);
            if (user == null || string.IsNullOrEmpty(user.BankAccountId))
                return NotFound("Account not linked");

            var txns = await _aaService.GetTransactions(user.BankAccountId);
            return Ok(txns);
        }
    }
}
