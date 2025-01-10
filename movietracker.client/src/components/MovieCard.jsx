import React from 'react';
import './MovieCard.css';

function MovieCard({ initialMovieData, onDelete }) {
    const { movieId, title, overview, posterPath, rating, review } = initialMovieData;

    const handleDelete = () => {
        onDelete(movieId);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableMovie((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onEdit(editableMovie); // Pass the updated movie to the parent
        setIsEditing(false); // Exit editing mode
    };


    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 position-relative">
                {/* X Button for deleting */}
                <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                    onClick={handleDelete}
                >
                    X
                </button>
                <img
                    src={posterPath || 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    alt={title}
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{overview}</p>
                    <p className="card-text"><strong>Rating:</strong> {rating}</p>
                    <p className="card-text"><strong>Review:</strong> {review}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
