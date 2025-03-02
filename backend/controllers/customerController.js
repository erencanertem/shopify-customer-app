import fetchCustomers from '../services/shopifyService.js';

export const getCustomers = async (req, res) => {
  try {
    const { updatedAt } = req.query;
    const customers = await fetchCustomers(updatedAt);
    res.json({ 
      success: true, 
      data: customers,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching customers from Shopify',
      error: error.message 
    });
  }
};
