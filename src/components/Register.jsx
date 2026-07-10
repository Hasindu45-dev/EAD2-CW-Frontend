import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('All registration entry fields are required.');
      return;
    }

    const isEmailTaken = users.some(user => user.email.toLowerCase() === email.toLowerCase().trim());
    if (isEmailTaken) {
      setErrorMsg('This email address is already registered.');
      return;
    }

    // Creating the object using custom incrementing dynamic IDs
    const createdRecord = {
      id: users.length + 1,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      joined: new Date().toISOString().split('T')[0] // Sets live system date
    };

    // CRITICAL: This updates the array that the Admin users page reads live!
    setUsers([...users, createdRecord]);
    
    setSuccessMsg('Account created successfully!');
    
    // Smooth redirect to login view
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <Container className="my-5 py-5" style={{ maxWidth: '650px' }}>
      <h1 className="fw-normal mb-4 text-center" style={{ color: '#1a2536', fontSize: '42px' }}>
        Create account
      </h1>

      {errorMsg && <Alert variant="danger" className="rounded-0 py-2 small">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success" className="rounded-0 py-2 small">🎉 {successMsg}</Alert>}

      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="First name"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Last name"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            placeholder="Password"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="text-start">
          <Button
            type="submit"
            className="rounded-0 px-4 py-2 fw-semibold text-white border-0"
            style={{ backgroundColor: '#c58d5e', minWidth: '120px' }}
          >
            Create
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;