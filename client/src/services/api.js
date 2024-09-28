import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getTransactions = async (month, search, page = 1, per_page = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      params: {
        month,
        search,
        page,
        per_page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getTotalSaleAmount = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/total-sale-amount`, {
      params: { month }
    });
    return response.data.totalSaleAmount;
  } catch (error) {
    console.error('Error fetching total sale amount:', error);
    throw error;
  }
};

export const getTotalSoldItems = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/total-sold-items`, {
      params: { month }
    });
    return response.data.totalSoldItems;
  } catch (error) {
    console.error('Error fetching total sold items:', error);
    throw error;
  }
};

export const getTotalNotSoldItems = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/total-not-sold-items`, {
      params: { month }
    });
    return response.data.totalNotSoldItems;
  } catch (error) {
    console.error('Error fetching total not sold items:', error);
    throw error;
  }
};


export const getBarChartData = async (month) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bar-chart`, {
        params: { month }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      throw error;
    }
  };

  // Fetch pie chart data API
export const getPieChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pie-chart`, {
      params: { month }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    throw error;
  }
};

export const getCombinedData = async (month) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/combined-data`, {
        params: { month }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching combined data:', error);
      throw error;
    }
  };
  