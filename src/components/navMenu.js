import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavMenu() {
    return (
        <Navbar>
            <Navbar.Toggle bg="light" expand="lg"/>
            <Navbar.Collapse id="basic-navbar-nav"/>
            <Nav className="mr-auto">
                <Link to="/" >Home</Link>
                <Link to="/about" >About Us</Link>
                <Link to="/contact" >Contact Us</Link>
                <Link to="/blog" >Blog</Link>
            </Nav>
        </Navbar>
    )
}