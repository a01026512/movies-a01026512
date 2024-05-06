import React, { useEffect, useState } from "react";
import { IMovieResponse, getPopularMovies, getTopRated, getUpcoming } from "../../services";

import { MovieCard } from "../../components/MovieCard";
import { movies } from "../../constants/moviesMock";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const popularRes = await getPopularMovies();
            const topRatedRes = await getTopRated();
            const upcomingRes = await getUpcoming();

            if (popularRes && popularRes.data && topRatedRes && topRatedRes.data && upcomingRes && upcomingRes.data) {
                setPopularMovies(popularRes.data.results);
                setTopRatedMovies(topRatedRes.data.results);
                setUpcomingMovies(upcomingRes.data.results);
            }
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <section className='home'>
            <div className="movies-container">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={movie.id}
                        movieId={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        voteAverage={movie.vote_average}
                        genreId={movie.genre_ids[0]}
                    />
                ))}
            </div>
        </section>
    );
}

export default Home;