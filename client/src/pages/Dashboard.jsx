import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('March'); // Default to March
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTransactions();
    }, [month, search, page]);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions(month, search, page);
            setTransactions(data.transactions);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page when search changes
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setPage(1); // Reset to first page when month changes
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center w-full">
            <div className="w-4/5 py-8">
                {/* Full Circular Div for the Title */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white shadow-lg rounded-full w-64 h-64 flex items-center justify-center p-6">

                        <h1 className="text-3xl font-bold text-center">Transaction Dashboard</h1>
                    </div>
                </div>

                <div className="flex justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search transaction"
                        className="px-4 py-2 rounded-full bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <select
                        className="px-4 py-2 rounded-full bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={month}
                        onChange={handleMonthChange}
                    >
                        {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-yellow-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Sold</th>
                                <th className="border p-2">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <tr key={transaction.id} className="bg-yellow-100">
                                        <td className="border p-2">{transaction.id}</td>
                                        <td className="border p-2">{transaction.title}</td>
                                        <td className="border p-2">{transaction.description}</td>
                                        <td className="border p-2">Rs.{transaction.price ? transaction.price.toFixed(2) : '0.00'}</td>
                                        <td className="border p-2">{transaction.category}</td>
                                        <td className="border p-2">{transaction.sold ? 'Yes' : 'No'}</td>
                                        <td className="border p-2">
                                            <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center border p-2">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 bg-white rounded-lg shadow-lg p-4">
                    <span>Page No: {page}</span>
                    <div>
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-yellow-300 rounded-full mr-2 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-yellow-300 rounded-full disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <span>Per Page: 10</span>
                </div>
            </div>
        </div>
    );
}
