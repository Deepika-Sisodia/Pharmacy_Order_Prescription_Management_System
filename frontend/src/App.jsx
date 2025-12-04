import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DeliveryDashboard from './Delivery_Agent_Dashboard/DeliveryDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/delivery-dashboard" replace />} />
          <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
