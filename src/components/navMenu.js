import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavMenu() {
    return (
        <Navbar>
            <Navbar.Toggle bg="light" expand="lg"/>
            <Navbar.Collapse id="basic-navbar-nav"/>
            <Nav className="mr-auto">
                <Link to="/" exact>Home</Link>
                <Link to="/about" exact>About Us</Link>
                <Link to="/contact" exact>Contact Us</Link>
                <Link to="/blog" exact>Blog</Link>
            </Nav>
        </Navbar>
    )
}