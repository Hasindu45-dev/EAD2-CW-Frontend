import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeCarousel from './components/HomeCarousel';
import PromoSection from './components/PromoSection';
import About from './components/About';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import Footer from './components/Footer';

import AdminDashboardPage from './components/AdminDashboardPage';
import InventoryManagementPage from './components/InventoryManagementPage';
import AdminUsersPage from './components/AdminUsersPage';

import './App.css';

function AppLayout({ users, setUsers, currentUser, setCurrentUser, cartItems, setCartItems }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Dynamic Navbar - Receives synchronized global cart data */}
      {!isAdminPath && (
        <Navbar 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser} 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
        />
      )}
      
      <div className="flex-grow-1">
        <Routes>
          {/* ================= STOREFRONT RETAIL ROUTES ================= */}
          <Route path="/" element={
            <>
              <HomeCarousel />
              <PromoSection />
        
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={
            <ProductDetail cartItems={cartItems} setCartItems={setCartItems} />
          } />
          <Route path="/cart" element={
            <CartPage cartItems={cartItems} setCartItems={setCartItems} />
          } />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* User Operations */}
          <Route path="/login" element={<Login users={users} setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register users={users} setUsers={setUsers} />} />
          <Route path="/profile-settings" element={
            <UpdateProfile currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} setUsers={setUsers} />
          } />

          {/* ================= ADMIN ROUTE MODULES ================= */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage usersCount={users.length} />} />
          <Route path="/admin/inventory" element={<InventoryManagementPage />} />
          <Route path="/admin/users" element={<AdminUsersPage registeredUsers={users} />} />
        </Routes>
      </div>

      {!isAdminPath && <Footer />}
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([
    { id: 1, firstName: 'Anura', lastName: 'Perera', email: 'anura.p@gmail.com', password: '123', joined: '2026-07-01' },
    { id: 2, firstName: 'Sanduni', lastName: 'Silva', email: 'sanduni@outlook.com', password: '123', joined: '2026-07-05' },
    { id: 3, firstName: 'Nimal', lastName: 'Fernando', email: 'nimal.fernando@yahoo.com', password: '123', joined: '2026-07-08' }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Centralized Cart Array Database State
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <AppLayout 
        users={users} 
        setUsers={setUsers} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </Router>
  );
}

export default App;