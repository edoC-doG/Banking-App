import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// Ensure you have the environment variables for PLAID_CLIENT_ID and PLAID_SECRET set up in your environment
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // This sets the environment to sandbox for testing
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID, // Use the environment variable for the client ID
      "PLAID-SECRET": process.env.PLAID_SECRET, // Use the environment variable for the secret
      // Note: PLAID_ENV is not used here in the headers. If you need to dynamically set the environment, use it in the basePath above.
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
