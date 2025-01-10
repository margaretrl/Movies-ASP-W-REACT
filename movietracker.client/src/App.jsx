import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard.jsx';
import AddMovieForm from './components/AddMovieForm.jsx'
function App({ initialMovieList }) {
    const [movies, setMovies] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

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

    const handleAddMovie = (newMovie) => {
        setMovies((prevMovies) => [...prevMovies, newMovie]);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible((prev) => !prev); // Toggle the form visibility
    };

    const cards = movies.map((movie) => (
        <MovieCard
            key={movie.movieId}
            initialMovieData={movie}
            onDelete={handleDeleteMovie} 
            onEdit={handleEditMovie}
        />
    ));

    return (
        <div className="container">
            <div className="my-4 text-center">
                <button className="btn btn-primary" onClick={toggleFormVisibility}>
                    {isFormVisible ? 'Close Form' : 'Add New Movie'}
                </button>
            </div>
            {isFormVisible && <AddMovieForm onAddMovie={handleAddMovie} />}
            <h1 className="my-4">Movies</h1>
            <div className="row">
                {movies.length === 0 ? (
                    <p className="text-center">Loading... Please refresh if the backend has started.</p>
                ) : (
                    cards
                )}
            </div>

        </div>
    );
}

export default App;
