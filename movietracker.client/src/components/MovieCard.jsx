import React, { useState } from "react";
import "./MovieCard.css";

function MovieCard({ initialMovieData, onDelete, onEdit }) {
    const { movieId, title, overview, posterPath, rating, review } = initialMovieData;

    const [isEditing, setIsEditing] = useState(false);
    const [editableMovie, setEditableMovie] = useState(initialMovieData);
    const [errors, setErrors] = useState({});

    const handleDelete = () => {
        onDelete(movieId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "rating") {
            const numericValue = Number(value);
            if (numericValue < 1 || numericValue > 10) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "Rating must be between 1 and 10",
                }));
            } else {
                setErrors((prev) => {
                    const { [name]: removed, ...rest } = prev;
                    return rest;
                });
            }
        }

        setEditableMovie((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`https://localhost:7111/api/movies/${movieId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editableMovie),
                });

                if (response.ok) {
                    const updatedMovie = await response.json();
                    onEdit(updatedMovie); // Pass the updated movie back to the parent
                    setIsEditing(false);
                } else {
                    alert(`Failed to update movie. Status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error updating movie:", error);
                alert("An error occurred while updating the movie.");
            }
        } else {
            alert("Please resolve errors before saving.");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditableMovie(initialMovieData);
        setIsEditing(false);
        setErrors({});
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 position-relative">
                <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                    onClick={handleDelete}
                >
                    X
                </button>
                <img
                    src={posterPath || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={title}
                />
                <div className="card-body">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="title"
                                value={editableMovie.title}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                            />
                            <textarea
                                name="overview"
                                value={editableMovie.overview}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                                rows="3"
                            ></textarea>
                            <input
                                type="number"
                                name="rating"
                                value={editableMovie.rating}
                                onChange={handleInputChange}
                                className={`form-control mb-2 ${errors.rating ? "is-invalid" : ""
                                    }`}
                                min="1"
                                max="10"
                            />
                            {errors.rating && (
                                <div className="invalid-feedback mb-2">{errors.rating}</div>
                            )}
                            <input
                                type="text"
                                name="review"
                                value={editableMovie.review}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                            />
                            <button className="btn btn-success me-2" onClick={handleSave}>
                                Save
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{overview}</p>
                            <p className="card-text">
                                <strong>Rating:</strong> {rating}
                            </p>
                            <p className="card-text">
                                <strong>Review:</strong> {review}
                            </p>
                            <button className="btn btn-primary" onClick={handleEdit}>
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
