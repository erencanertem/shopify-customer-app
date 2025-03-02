# Shopify Customer App Backend

This is the backend service for the Shopify Customer App, which provides API endpoints to fetch and manage customer data from a Shopify store.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SHOPIFY_SHOP_NAME=your-shop-name
SHOPIFY_ACCESS_TOKEN=your-access-token
PORT=7999
```

## Installation

```bash
npm install
```

## Running the Application

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

- GET `/api/customers` - Fetch all customers
  - Optional query parameter: `date` (YYYY-MM-DD) to filter by update date

## Deployment (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables in Render.com dashboard
5. Deploy! 