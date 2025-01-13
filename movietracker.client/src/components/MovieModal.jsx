import React, { useState } from "react";
import "./MovieModal.css";

function MovieModal({ movie, onClose, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
    const [editedMovie, setEditedMovie] = useState({ ...movie }); // Editable copy of the movie

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "rating") {
            const numericValue = Number(value);
            if (numericValue < 1 || numericValue > 10) {
                // Prevent setting the rating beyond allowed range
                return;
            }
        }

        setEditedMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value,
        }));
    };


    const handleSave = () => {
        onEdit(editedMovie);
        setIsEditing(false);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                {/* Conditionally render close button */}
                {!isEditing && (
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                )}
                <div className="modal-content">
                    {isEditing ? (
                        <>
                            <h2>Edit Movie</h2>
                            <div className="form-group">
                                <label>Poster URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="posterPath"
                                    value={editedMovie.posterPath}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={editedMovie.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Overview</label>
                                <textarea
                                    className="form-control"
                                    name="overview"
                                    value={editedMovie.overview}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="rating"
                                    value={editedMovie.rating}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="10"
                                />
                            </div>
                            <div className="form-group">
                                <label>Review</label>
                                <textarea
                                    className="form-control"
                                    name="review"
                                    value={editedMovie.review}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button className="btn btn-success" onClick={handleSave}>
                                    Save
                                </button>
                                <button
                                    className=" btn btn-danger"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={movie.posterPath || "https://via.placeholder.com/150"}
                                alt={movie.title}
                            />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <p>
                                <strong>Rating:</strong> {movie.rating}
                            </p>
                            <p>
                                <strong>Review:</strong> {movie.review || "No review available."}
                            </p>
                            <div className="modal-buttons">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(movie.movieId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
