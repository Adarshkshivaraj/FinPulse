using System;
namespace FinPulseAPI.Core.Entities
{
	public class ApplicationUser
	{
		public Guid Id { get; set; }
		public string LoginName { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public string PasswordHash { get; set; } = string.Empty;
		public string Role { get; set; } = "User";

        public string? MobileNumber { get; set; } = string.Empty;
        public string? ConsentHandle { get; set; } = string.Empty;
        public string? BankAccountId { get; set; } = string.Empty;
    }
}

