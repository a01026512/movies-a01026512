import { useEffect, useState } from "react";
import { IMovieResponse, getPopularMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Popular: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getPopular = async () => {
        await getPopularMovies()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res");
                    setMovies(res.data.results);
                }
            }).catch((err) => {
                console.log(err, "err");
            });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getPopular();
    }, []);

    return (
        <section className='popular'>
            <h1>Popular</h1>
            <div className="movies-container">
                {loading ? <div>Loading...</div> : movies.map((movie, index) => (
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
};

export default Popular;