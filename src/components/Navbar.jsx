import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Form, InputGroup, Button, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser, setCurrentUser, cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  // Compute overall aggregate total item quantity counts
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Compute total price value inside side drawer context layout
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const removeItemFromSidebar = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <header className="bg-white border-bottom w-100 m-0 p-0 shadow-sm sticky-top">
      <Container fluid className="px-5 py-3">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 w-100">
          
          {/* Logo Section */}
          <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center me-0 m-0 p-0">
            <div className="text-start">
              <span className="fw-bold fs-3" style={{ color: '#c58d5e', fontFamily: 'sans-serif' }}>LuxeSkin.lk</span>
              <div className="text-muted" style={{ fontSize: '10px', marginTop: '-6px', letterSpacing: '0.5px' }}>
                (Gives a high-end, luxury boutique feel)
              </div>
            </div>
          </BootstrapNavbar.Brand>

          {/* Search Bar */}
          <Form className="w-100 mx-md-5" style={{ maxWidth: '700px' }}>
            <InputGroup>
              <Form.Control type="search" placeholder="Search" className="rounded-0 border-end-0 py-2" />
              <Button variant="outline-secondary" className="rounded-0 px-4 fw-semibold text-white border-0" style={{ backgroundColor: '#c58d5e' }}>
                Search
              </Button>
            </InputGroup>
          </Form>

          {/* Account & Cart Section */}
          <div className="d-flex align-items-center gap-4 flex-shrink-0">
            
            {/* Conditional Account Avatar Logic Grid */}
            <div className="d-flex align-items-center gap-1">
              {currentUser ? (
                <NavDropdown 
                  align="end"
                  title={
                    <div 
                      className="d-inline-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#c58d5e', fontSize: '15px', cursor: 'pointer' }}
                    >
                      {currentUser.firstName.charAt(0).toUpperCase()}
                    </div>
                  } 
                  id="user-profile-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile-settings">Update Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger fw-semibold">Logout Profile</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <i className="bi bi-person fs-2 text-dark"></i>
                  <NavDropdown title={
                    <div className="d-inline-block text-start lh-sm" style={{ fontSize: '14px' }}>
                      <span className="text-muted d-block" style={{ fontSize: '13px' }}>My Account</span>
                      <strong className="text-dark">Log In</strong>
                    </div>
                  } id="account-dropdown" align="end">
                    <NavDropdown.Item as={Link} to="/login"><i className="bi bi-lock-fill"></i> Log In</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register"><i className="bi bi-person-plus-fill"></i> Create Account</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </div>

            {/* Dynamic Cart Trigger Link */}
            <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={handleShow}>
              <div className="position-relative">
                <i className="bi bi-cart3 fs-3 text-dark"></i>
                {totalCartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white small" style={{ fontSize: '10px' }}>
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-dark" style={{ fontSize: '15px' }}><strong>Cart ({totalCartCount})</strong></span>
            </div>
          </div>
        </div>
      </Container>

      {/* Synchronized Side Cart Drawer View Structure */}
      <Offcanvas show={showCart} onHide={handleClose} placement="end" style={{ width: '420px' }}>
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-semibold">Your Selected Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column h-100 p-3">
          {cartItems.length === 0 ? (
            <div className="my-auto text-center w-100">
              <h2 className="mb-4 fs-3 fw-normal text-secondary">Your cart is empty</h2>
              <Button onClick={handleClose} className="rounded-0 px-5 py-2 mb-4 border-0 text-white" style={{ backgroundColor: '#c58d5e' }}>
                Continue shopping
              </Button>
              {!currentUser && (
                <div className="text-dark small">
                  <p className="mb-1">Have an account?</p>
                  <Link to="/login" onClick={handleClose} className="text-dark fw-bold">Log in</Link> to check out faster.
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Scrollable list content */}
              <div className="flex-grow-1 overflow-y-auto mb-3" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex gap-3 align-items-center border-bottom py-3">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="border rounded object-fit-cover" 
                      style={{ width: '65px', height: '65px' }} 
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0 text-dark small fw-semibold text-truncate" style={{ maxWidth: '200px' }}>{item.name}</h6>
                      <span className="text-muted small d-block">Qty: {item.qty}</span>
                      <strong className="text-dark small">Rs. {(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                    </div>
                    <Button variant="link" className="text-danger p-0 ms-auto" onClick={() => removeItemFromSidebar(item.id)}>
                      <i className="bi bi-trash3 fs-5"></i>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Drawer Total and Redirect Buttons Section */}
              <div className="border-top pt-3 mt-auto bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary fw-medium">Subtotal:</span>
                  <span className="fw-bold fs-5" style={{ color: '#c58d5e' }}>Rs. {cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <Button 
                  as={Link} 
                  to="/cart" 
                  onClick={handleClose} 
                  className="w-100 rounded-0 py-2.5 mb-2 fw-semibold text-white border-0 text-center" 
                  style={{ backgroundColor: '#1a2536' }}
                >
                  View Shopping Cart
                </Button>
                <Button 
                  as={Link} 
                  to="/checkout" 
                  onClick={handleClose} 
                  className="w-100 rounded-0 py-2.5 fw-semibold text-white border-0 text-center" 
                  style={{ backgroundColor: '#c58d5e' }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Lower Menu Navigation */}
      <BootstrapNavbar expand="lg" bg="light" className="py-2 border-top border-bottom">
        <Container fluid className="px-5">
          <BootstrapNavbar.Collapse id="main-navbar-nav">
            <Nav className="gap-4">
              <Nav.Link as={Link} to="/" className="fw-semibold text-dark fs-5">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-semibold text-dark fs-5">About</Nav.Link>
              <Nav.Link as={Link} to="/products" className="fw-semibold text-dark fs-5">Product</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </header>
  );
};

export default Navbar;