import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { sampleProducts } from './productsData'; // 👈 Fixed Import Path

const AdminDashboardPage = () => {
  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="mb-4">
          <h2 className="fw-bold text-dark m-0">Dashboard Overview</h2>
          <p className="text-muted small m-0">Live diagnostic monitor metrics summary panel.</p>
        </div>
        
        <Row className="g-3 mb-4">
          <Col xs={12} md={4}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4">
                <span className="text-muted text-uppercase small fw-semibold d-block mb-1">Active Catalog Lines</span>
                <h2 className="fw-bold m-0" style={{ color: '#c58d5e' }}>{sampleProducts?.length || 4} Products</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4">
                <span className="text-muted text-uppercase small fw-semibold d-block mb-1">Registered Customers</span>
                <h2 className="fw-bold m-0" style={{ color: '#2d3748' }}>3 Verified</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4">
                <span className="text-muted text-uppercase small fw-semibold d-block mb-1">Stock Flags</span>
                <h2 className="fw-bold m-0" style={{ color: '#dc3545' }}>1 Low Alert</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h5 className="fw-bold text-dark mb-3">Live System Feeds</h5>
        <Alert variant="warning" className="rounded-0 border-0 shadow-sm p-3 bg-white border-start border-warning border-4">
          <strong>System Status Flag:</strong> No live database connected. All data operations are utilizing simulated sandbox storage states.
        </Alert>
      </Container>
    </div>
  );
};

export default AdminDashboardPage;