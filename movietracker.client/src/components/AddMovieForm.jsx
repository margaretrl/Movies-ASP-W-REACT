import React, { useState } from 'react';

function AddMovieForm({ onAddMovie }) {
    const [newMovie, setNewMovie] = useState({
        title: '',
        overview: '',
        posterPath: '',
        rating: 0,
        review: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value
        }));
    };

    const addMovie = async () => {
        try {
            const response = await fetch('https://localhost:7111/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMovie),
            });

            if (response.ok) {
                const createdMovie = await response.json();
                onAddMovie(createdMovie); // Update movie list in App.js
                setNewMovie({ title: '', overview: '', posterPath: '', rating: 0, review: '' });
            } else {
                console.error('Error adding movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div className="my-4">
            <h2>Add a New Movie</h2>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={newMovie.title}
                    onChange={handleInputChange}
                    placeholder="Enter movie title"
                />
            </div>
            <div className="form-group">
                <label>Overview</label>
                <textarea
                    className="form-control"
                    name="overview"
                    value={newMovie.overview}
                    onChange={handleInputChange}
                    placeholder="Enter movie overview"
                />
            </div>
            <div className="form-group">
                <label>Poster URL</label>
                <input
                    type="text"
                    className="form-control"
                    name="posterPath"
                    value={newMovie.posterPath}
                    onChange={handleInputChange}
                    placeholder="Enter poster URL"
                />
            </div>
            <div className="form-group">
                <label>Rating</label>
                <input
                    type="number"
                    className="form-control"
                    name="rating"
                    value={newMovie.rating}
                    onChange={handleInputChange}
                    placeholder="Enter movie rating (0-5)"
                />
            </div>
            <div className="form-group">
                <label>Review</label>
                <textarea
                    className="form-control"
                    name="review"
                    value={newMovie.review}
                    onChange={handleInputChange}
                    placeholder="Enter movie review"
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={addMovie}>
                Add Movie
            </button>
        </div>
    );
}

export default AddMovieForm;
