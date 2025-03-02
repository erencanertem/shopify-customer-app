import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Missing required environment variables: SHOPIFY_STORE_URL or SHOPIFY_ACCESS_TOKEN');
}

console.log('Shopify Configuration:', {
  STORE_URL: SHOPIFY_STORE_URL,
  TOKEN_EXISTS: !!SHOPIFY_ACCESS_TOKEN
});

const createCustomerQuery = (updatedAt) => {
  if (!updatedAt) {
    updatedAt = new Date(0).toISOString();
  }
  
  // Escape any special characters in the date string
  const escapedDate = updatedAt.replace(/"/g, '\\"');
  
  return `
    query {
      shop {
        name
        customers(
          first: 20,
          sortKey: UPDATED_AT,
          reverse: true,
          query: "updated_at:>'${escapedDate}'"
        ) {
          edges {
            node {
              id
              firstName
              lastName
              email
              state
              updatedAt
              createdAt
              note
              tags
            }
          }
        }
      }
    }
  `;
};

const fetchCustomers = async (updatedAt = '') => {
  try {
    console.log('Attempting to fetch customers with URL:', SHOPIFY_STORE_URL);
    
    const query = createCustomerQuery(updatedAt);
    console.log('GraphQL Query:', query);

    const response = await fetch(SHOPIFY_STORE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    });

    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    
    if (data.errors) {
      throw new Error(Array.isArray(data.errors) 
        ? data.errors[0].message 
        : typeof data.errors === 'string' 
          ? data.errors 
          : 'Unknown GraphQL error');
    }

    if (!data.data?.shop) {
      throw new Error('Invalid response format from Shopify API');
    }

    const customers = data.data.shop.customers?.edges?.map(edge => ({
      ...edge.node,
      totalSpent: edge.node.statistics?.totalSpent?.amount || 0,
      orderCount: edge.node.statistics?.totalOrderCount || 0,
      averageOrderAmount: edge.node.averageOrderAmountV2?.amount || 0,
      currency: edge.node.statistics?.totalSpent?.currencyCode || 'TRY'
    })) || [];

    console.log(`${customers.length} customers fetched successfully from shop: ${data.data.shop.name}`);
    return customers;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      url: SHOPIFY_STORE_URL
    });
    throw error;
  }
};

export default fetchCustomers;
  