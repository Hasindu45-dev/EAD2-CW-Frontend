import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Inventory (CRUD)', path: '/admin/inventory', icon: '📦' },
    { name: 'Registered Users', path: '/admin/users', icon: '👥' },
    { name: 'Return to Store', path: '/', icon: '🏪' },
  ];

  return (
    <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px', minHeight: '100vh', flexShrink: 0 }}>
      <h4 className="fw-bold mb-4 text-center py-2 border-bottom text-uppercase tracking-wider" style={{ color: '#c58d5e', fontFamily: 'serif' }}>
        LuxeSkin Admin
      </h4>
      <Nav className="flex-column gap-2 flex-grow-1">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Nav.Link
              key={idx}
              as={Link}
              to={item.path}
              className={`text-white rounded-0 py-2 px-3 d-flex align-items-center gap-2 ${isActive ? 'fw-bold' : ''}`}
              style={{ 
                transition: 'all 0.2s', 
                backgroundColor: isActive ? '#c58d5e' : 'transparent' 
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span> 
              <span>{item.name}</span>
            </Nav.Link>
          );
        })}
      </Nav>
    </div>
  );
};

export default AdminSidebar;