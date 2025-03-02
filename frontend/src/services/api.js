const API_URL = import.meta.env.VITE_API_URL;

export const fetchCustomers = async (filterDate) => {
  try {
    const url = filterDate ? `${API_URL}?date=${filterDate}` : API_URL;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch customers');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return {
      success: false,
      message: error.message,
      data: []
    };
  }
};