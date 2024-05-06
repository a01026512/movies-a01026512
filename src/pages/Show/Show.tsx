import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IDetailsResponse, IMovieResponse, getDetailsMovies, getRecommendations } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { Rating } from "../../components/Rating";
import imdb from '../../assets/img/LogoIMDb.png';
import arrow from '../../assets/icons/arrow.svg';
import heartSolid from '../../assets/icons/heart-solid.svg';
import heartBorder from '../../assets/icons/heart-border.svg';
import { MovieCard } from "../../components/MovieCard";

const Show = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IDetailsResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovieResponse[]>([]);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id]
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const goBack = () => {
        navigate(-1);
    }

    const getDetails = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            await getDetailsMovies(movieId)
                .then((res) => {
                    if (res && res.data) {
                        console.log(res.data, "res");
                        setMovie(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err, "err")
                });
            setLoading(false);
        }

    }

    const getRecommended = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            await getRecommendations(movieId)
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
        }
    };

    useEffect(() => {
        const favs = localStorage.getItem('favorites') || "";
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        setLoading(true);
        getDetails();
        getRecommended();
    }, [id])

    return (
        <section className="show">
            <div className="back-btn">
                <button type="button" onClick={goBack}>
                    <img src={arrow} alt="Atras" />
                </button>
            </div>
            <div className="show-card">
                <div className="left">
                    <img className="poster" src={IMAGE_SOURCE + movie?.poster_path} alt="poster" width={720} height={1280} />
                    <div className="links">
                        <a href={`https://www.imdb.com/title/${movie?.imdb_id}`} target="_blank" className="imbd">
                            <img src={imdb} alt="IMBd" />
                        </a>
                        {isFavorite ? (
                            <button className="favorite active" onClick={removeFavorite}>
                                <img src={heartSolid} alt="Remove" />
                            </button>
                        ) : (
                            <button className="favorite" data-favorite={isFavorite} onClick={addFavorite}>
                                <img src={heartBorder} alt="Add" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="right">
                    <h2>{movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})</h2>
                    <p>{movie?.overview}</p>
                    <br />
                    <Rating value={movie?.vote_average ?? 0} />
                </div>
            </div>
            <h1>Recommended:</h1>
            <div className="movies-container">
                {movies.map((movie) => (
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

export default Show;
