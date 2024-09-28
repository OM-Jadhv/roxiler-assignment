import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg'; 

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center">
      <img src={logo} alt="Logo" width={100} height={50} className="mr-4 rounded" />
      </div>
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Dashboard</Link></li>
        <li><Link to="/statistics" className="text-white">Statistics</Link></li>
        <li><Link to="/barchart" className="text-white">Bar Chart</Link></li>
        <li><Link to="/piechart" className="text-white">Pie Chart</Link></li> 
        <li><Link to="/combined-data-viewer" className="text-white">Combine Data</Link></li> 
      </ul>
    </nav>
  );
}
