import React from 'react';
import './Header.css';

function Header({ title, onToggleForm, onSearch }) {
    return (
        <header className="fixed-top">
            <h1>{title}</h1>
            <div className="header-actions">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by title..."
                    onChange={(e) => onSearch(e.target.value)}
                />
                <button className="btn btn-primary" onClick={onToggleForm}>
                    Add New Movie
                </button>
            </div>
        </header>
    );
}

export default Header;
