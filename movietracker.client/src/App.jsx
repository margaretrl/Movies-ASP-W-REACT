import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard.jsx';
import MovieModal from './components/MovieModal.jsx';
import AddMovieForm from './components/AddMovieForm.jsx';
import Header from './components/Header.jsx';

function App() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('https://localhost:7111/api/movies');
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleDeleteMovie = async (movieId) => {
        try {
            const response = await fetch(`https://localhost:7111/api/movies/${movieId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.movieId !== movieId));
                setIsModalOpen(false);
            } else {
                console.error('Error deleting movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const handleEditMovie = async (updatedMovie) => {
        try {
            const response = await fetch(`https://localhost:7111/api/movies/${updatedMovie.movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });

            if (response.ok) {
                const newMovie = await response.json();
                setMovies((prevMovies) =>
                    prevMovies.map((movie) =>
                        movie.movieId === newMovie.movieId ? newMovie : movie
                    )
                );
            } else {
                console.error('Error updating movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    const openAddForm = () => {
        setIsAddFormOpen(true);
    };

    const closeAddForm = () => {
        setIsAddFormOpen(false);
    };

    const cards = movies.map((movie) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={movie.movieId}>
            <MovieCard
                initialMovieData={movie}
                onClick={() => openModal(movie)}
            />
        </div>
    ));

    return (
        <div className="app-container">
            <Header title="MovieTracker" onToggleForm={openAddForm} />
            <div className="header-spacing"></div>

            <div className={`content ${isModalOpen || isAddFormOpen ? 'blur' : ''}`}>
                <div className="row g-3">
                    {movies.length === 0 ? (
                        <p className="text-center">
                            Loading... Please refresh if the backend has started.
                        </p>
                    ) : (
                        cards
                    )}
                </div>
            </div>

            {isModalOpen && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={closeModal}
                    onDelete={handleDeleteMovie}
                    onEdit={handleEditMovie}
                />
            )}

            {isAddFormOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <AddMovieForm
                            onAddMovie={(newMovie) => {
                                setMovies((prevMovies) => [...prevMovies, newMovie]);
                                closeAddForm();
                            }}
                            onClose={closeAddForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
