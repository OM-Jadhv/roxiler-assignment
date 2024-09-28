import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getBarChartData } from '../services/api';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function BarChartStats() {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBarChartData(selectedMonth);
        setChartData(data);
      } catch (err) {
        console.error('Error fetching bar chart data:', err);
        setError('Failed to fetch bar chart data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Bar Chart Stats - {selectedMonth}</h1>
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
          <div className="text-center py-4">Loading bar chart data...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 70,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" tick={{ angle: -45, dy: 20 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4DD0E1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}