import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navmenu.css'

export default function NavMenu() {
    return (
        <Navbar>
            <Navbar.Toggle bg="light" expand="lg"/>
            <Navbar.Collapse id="basic-navbar-nav"/>
            <Nav className="mr-auto my_nave">
                <Link to="/" >Home</Link>
                <Link to="/about" >About Us</Link>
                <Link to="/contact" >Contact Us</Link>
                <Link to="/blog" >Blog</Link>
                <Link to="/lifeSicle" >LifeSicle</Link>
                <Link to="/counterhooks" >CounterHooks</Link>
                <Link to="/reactcontext" >ReactContext</Link>
                <Link to="/redux" >ReduxExample</Link>                
            </Nav>
        </Navbar>
    )
}