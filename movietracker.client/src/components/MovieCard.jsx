import React from 'react';
import './MovieCard.css';


function MovieCard({ initialMovieData, onClick }) {
    return (
        <div
            className="card-container"
            onClick={() => onClick(initialMovieData)} // Trigger edit mode on click
        >
            {/* Front Side */}
            <div className="card-front">
                <img
                    src={initialMovieData.posterPath || 'https://via.placeholder.com/150'}
                    alt={initialMovieData.title}
                    className="card-img"
                />
                <div className="card-body">
                    <h5 className="card-title">{initialMovieData.title}</h5>
                    <p className="card-text">{initialMovieData.overview}</p>
                </div>
            </div>

            {/* Back Side */}
            <div className="card-back">
                <div className="card-body">
                    <h5 className="card-title">{initialMovieData.title}</h5>
                    <p className="card-text">
                        <strong>Rating:</strong> {initialMovieData.rating}
                    </p>
                    <p className="card-text">
                        <strong>Review:</strong> {initialMovieData.review || 'No review'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
