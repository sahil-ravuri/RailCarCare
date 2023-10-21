// NavigationBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function NavigationBar({ onLogout }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand>Manager Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/assignments" className="nav-link">Assignments</Link>
                    <Link to="/orders" className="nav-link">Orders</Link>
                    <Link to="/complaints" className="nav-link">Complaints</Link>
                    <Link to="/profile" className="nav-link">Profile</Link>
                </Nav>
                <Button variant="danger" onClick={onLogout}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
