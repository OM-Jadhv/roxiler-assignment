import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import BarChartStats from './pages/BarChartStats';
import PieChartStats from './pages/PieChartStats'; 
import Navbar from './components/Navbar';
import CombinedDataViewer from './pages/CombinedDataViewer';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/barchart" element={<BarChartStats />} />
          <Route path="/piechart" element={<PieChartStats />} /> 
          <Route path="/combined-data-viewer" element={<CombinedDataViewer />} /> 
        </Routes>
      </div>
    </Router>
  );
}
