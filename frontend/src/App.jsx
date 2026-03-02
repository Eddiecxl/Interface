import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import InputForm from './pages/InputForm';
import ViewData from './pages/ViewData';
import './App.css';

function NavBar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="nav-brand">📦 Interface App</div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>📝 Input Form</Link>
        <Link to="/view" className={location.pathname === '/view' ? 'active' : ''}>📋 View Data</Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<InputForm />} />
          <Route path="/view" element={<ViewData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}