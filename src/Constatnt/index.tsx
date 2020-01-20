export const baseUrl = "http://172.16.200.206:3011";

export const ResponseCodes = {
  Unauthorized: 401,
  Successful: 200,
  "Either Source or Target wallet is not existing": 8,
  "Insufficient funds": 20,
  "System Error": 22,
  "Transaction failed because wallet is inactive": 40,
  "Request is expired": 62,
  "Invalid Date": 73,
  "Invalid Loan Provider credential": 74,
  "Invalid Debit Type Id": 75,
  "Failed to save record": 100,
  "Amount is invalid": 1202,
  "Amount to adjust must be greater than P0.00": 1207,
  "API Error": "U0001"
};
