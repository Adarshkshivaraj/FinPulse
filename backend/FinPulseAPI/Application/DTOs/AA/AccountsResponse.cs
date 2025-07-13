namespace finPulse.Models.AA
{
    public class BankAccount
    {
        public string AccountId { get; set; } = string.Empty;
        public string MaskedAccountNumber { get; set; } = string.Empty;
        public string IFSC { get; set; } = string.Empty;
        public string BankName { get; set; } = string.Empty;
    }

    public class AccountsResponse
    {
        public List<BankAccount>? Accounts { get; set; } 
    }
}
