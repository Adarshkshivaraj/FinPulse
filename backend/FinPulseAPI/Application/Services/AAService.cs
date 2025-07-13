using System.Text.Json;
using System.Text;
using System.Net.Http.Headers;
using finPulse.Interfaces;
using finPulse.Models.AA;
using Microsoft.Extensions.Configuration;

namespace finPulse.Services
{
    public class AAService : IAAService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public AAService(IConfiguration config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));

            var baseUrl = _config["AA:BaseUrl"] ?? throw new InvalidOperationException("Missing configuration: AA:BaseUrl");
            var clientId = _config["AA:ClientId"] ?? throw new InvalidOperationException("Missing configuration: AA:ClientId");
            var clientSecret = _config["AA:ClientSecret"] ?? throw new InvalidOperationException("Missing configuration: AA:ClientSecret");
            var masterUrn = _config["AA:MasterConsumerURN"] ?? throw new InvalidOperationException("Missing configuration: AA:MasterConsumerURN");

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(baseUrl)
            };

            var byteArray = Encoding.ASCII.GetBytes($"{clientId}:{clientSecret}");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            _httpClient.DefaultRequestHeaders.Add("x-consumer-urn", masterUrn);
        }

        public async Task<ConsentInitiateResponse> StartConsent(string mobileNumber)
        {
            var payload = new
            {
                identifier = new
                {
                    type = "MOBILE",
                    value = mobileNumber
                },
                consent = new
                {
                    purpose = "Personal Finance Tracking",
                    data_types = new[] { "TRANSACTIONS", "BALANCE" },
                    fi_types = new[] { "DEPOSIT" },
                    redirect_url = _config["AA:RedirectUrl"],
                    validity = "PT30D"
                }
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var res = await _httpClient.PostAsync("/api/v1/account-aggregator/consents", content);
            var json = await res.Content.ReadAsStringAsync();

            Console.WriteLine("StartConsent Response Status: " + res.StatusCode);
            Console.WriteLine("StartConsent Response Content: " + json);

            var result = JsonSerializer.Deserialize<ConsentInitiateResponse>(json);
            if (result == null)
                throw new InvalidOperationException("Failed to deserialize ConsentInitiateResponse. Response was:\n" + json);

            return result;
        }

        public async Task<AccountsResponse> GetAccounts(string consentId)
        {
            var res = await _httpClient.GetAsync($"/api/v1/account-aggregator/consents/{consentId}/accounts");
            var json = await res.Content.ReadAsStringAsync();

            Console.WriteLine("GetAccounts Response Status: " + res.StatusCode);
            Console.WriteLine("GetAccounts Response Content: " + json);

            var result = JsonSerializer.Deserialize<AccountsResponse>(json);
            if (result == null)
                throw new InvalidOperationException("Failed to deserialize AccountsResponse. Response was:\n" + json);

            return result;
        }

        public async Task<TransactionResponse> GetTransactions(string accountId)
        {
            var res = await _httpClient.GetAsync($"/api/v1/account-aggregator/accounts/{accountId}/transactions");
            var json = await res.Content.ReadAsStringAsync();

            Console.WriteLine("GetTransactions Response Status: " + res.StatusCode);
            Console.WriteLine("GetTransactions Response Content: " + json);

            var result = JsonSerializer.Deserialize<TransactionResponse>(json);
            if (result == null)
                throw new InvalidOperationException("Failed to deserialize TransactionResponse. Response was:\n" + json);

            return result;
        }
    }
}
