import React from 'react';
import './Header.css'

function Header({ title, onToggleForm }) {
    return (
        <header className="fixed-top">
            <h1>{title}</h1>
            <button className="btn btn-primary" onClick={onToggleForm}>
                Add New Movie
            </button>
            </header>
    );
}

export default Header;
