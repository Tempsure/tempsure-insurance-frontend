# Environment Variables Setup

This project uses environment variables to configure the backend API URL for deployment flexibility.

## Setup Instructions

1. Create a `.env.local` file in the root of the `tempsureinsurace-frontend` directory.

2. Add the following environment variable:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Environment Variable Details

- **NEXT_PUBLIC_API_BASE_URL**: The base URL of your backend API
  - For local development: `http://localhost:8000`
  - For production: Your deployed backend URL (e.g., `https://api.yourdomain.com`)
- **STRIPE_SECRET_KEY**: Stripe secret key used server-side by the Next.js API route that creates Checkout Sessions
- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Stripe publishable key (kept for client-side compatibility/future use)

## Important Notes

- The `NEXT_PUBLIC_` prefix is required for Next.js to expose the variable to the browser
- The `.env.local` file is automatically ignored by git (it's in `.gitignore`)
- For production deployment, set this environment variable in your hosting platform's environment settings
- Do not include trailing slashes in the URL - the config utility handles this automatically
- This project is Next.js (not Vite). If you already have Vite-style variable names, keep them as compatibility aliases and also set `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

## Example for Different Environments

### Local Development
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Staging
```bash
NEXT_PUBLIC_API_BASE_URL=https://staging-api.yourdomain.com
```

### Production
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```
