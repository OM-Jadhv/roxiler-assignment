import React, { useState, useEffect } from 'react';
import { getTotalSaleAmount, getTotalSoldItems, getTotalNotSoldItems } from '../services/api';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Statistics() {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    soldItems: 0,
    notSoldItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [totalSaleAmount, soldItems, notSoldItems] = await Promise.all([
          getTotalSaleAmount(selectedMonth),
          getTotalSoldItems(selectedMonth),
          getTotalNotSoldItems(selectedMonth)
        ]);
        setStats({ totalSaleAmount, soldItems, notSoldItems });
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to fetch statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedMonth]);

  return (
    <div className="bg-blue-50 h-[calc(100vh-4rem)] flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <span className="mb-2 sm:mb-0">Statistics - {selectedMonth}</span>
          <select
            className="text-base sm:text-lg bg-yellow-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </h1>
        
        {loading ? (
          <div className="text-center py-4">Loading statistics...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <div className="bg-yellow-100 rounded-lg p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2">
                <h2 className="text-lg sm:text-xl font-semibold">Total sale</h2>
                <p className="text-2xl sm:text-3xl font-bold">Rs.{stats.totalSaleAmount.toLocaleString()}</p>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">Total sold item</h2>
                <p className="text-2xl sm:text-3xl font-bold">{stats.soldItems}</p>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">Total not sold item</h2>
                <p className="text-2xl sm:text-3xl font-bold">{stats.notSoldItems}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}