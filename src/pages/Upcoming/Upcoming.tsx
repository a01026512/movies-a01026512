import { useEffect, useState } from "react";
import { IMovieResponse, getTopRated, getUpcoming } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Upcoming: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMovies, setErrorMovies] = useState<boolean>(false);

    const getUp = async () => {
        await getUpcoming()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res");
                    setMovies(res.data.results);
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getUp();
    }, []);

    return (
        <section className="upcoming">
            <h1>Upcoming</h1>
             <div className='movies-container'>
                {loading ? <div> Loading... </div> : movies.map((movie, index) => (
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

export default Upcoming;