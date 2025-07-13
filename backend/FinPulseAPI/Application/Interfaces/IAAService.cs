using finPulse.Models.AA;

namespace finPulse.Interfaces
{
    public interface IAAService
    {
        Task<ConsentInitiateResponse> StartConsent(string mobileNumber);
        Task<AccountsResponse> GetAccounts(string consentHandle);
        Task<TransactionResponse> GetTransactions(string accountId);
    }
}
