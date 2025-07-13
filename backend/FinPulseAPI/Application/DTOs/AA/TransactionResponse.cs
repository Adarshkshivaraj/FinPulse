namespace finPulse.Models.AA
{
    public class Transaction
    {
        public string Date { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Amount { get; set; }
        public string Type { get; set; } = string.Empty;
    }

    public class TransactionResponse
    {
        public List<Transaction>? Transactions { get; set; }
    }
}
