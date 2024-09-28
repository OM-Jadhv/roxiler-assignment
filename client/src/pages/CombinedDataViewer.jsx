import React, { useState, useEffect } from 'react';
import { getCombinedData } from '../services/api';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CombinedDataViewer() {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [combinedData, setCombinedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCombinedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCombinedData(selectedMonth);
        setCombinedData(data);
      } catch (err) {
        console.error('Error fetching combined data:', err);
        setError('Failed to fetch combined data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCombinedData();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Combined Data - {selectedMonth}</h1>
          <select
            className="text-lg bg-cyan-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading combined data...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <pre className="bg-gray-50 border border-gray-300 p-4 rounded overflow-auto">
              {JSON.stringify(combinedData.transactions, null, 2)}
            </pre>

            <h2 className="text-xl font-semibold">Total Sale Amount</h2>
            <p className="bg-gray-50 border border-gray-300 p-4 rounded">{combinedData.totalSale}</p>

            <h2 className="text-xl font-semibold">Total Sold Items</h2>
            <p className="bg-gray-50 border border-gray-300 p-4 rounded">{combinedData.totalSoldItems}</p>

            <h2 className="text-xl font-semibold">Total Not Sold Items</h2>
            <p className="bg-gray-50 border border-gray-300 p-4 rounded">{combinedData.totalNotSoldItems}</p>

            <h2 className="text-xl font-semibold">Bar Chart Data</h2>
            <pre className="bg-gray-50 border border-gray-300 p-4 rounded overflow-auto">
              {JSON.stringify(combinedData.barChartData, null, 2)}
            </pre>

            <h2 className="text-xl font-semibold">Pie Chart Data</h2>
            <pre className="bg-gray-50 border border-gray-300 p-4 rounded overflow-auto">
              {JSON.stringify(combinedData.pieChartData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
