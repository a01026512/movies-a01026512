import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IDetailsResponse, IMovieResponse, getDetailsMovies, getRecommendations } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { ProgressBar } from "../../components/ProgressBar";
// import imdbLogo from '../../LogoIMDB.png';
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
        <div>
            <div className="my-4 mx-44 shadow-2xl rounded-3xl bg-blue-100">
                <div className="p-8">
                    <div className="flex">
                        <div className="min-w-[20%] min-h-[20%] max-w-[20%] max-h-[20%]">
                            <img className="rounded-3xl" src={IMAGE_SOURCE + movie?.poster_path} alt="poster"></img>
                            <div className="flex mt-2 space-x-2">
                                <button className="bg-blue-950 text-white rounded-3xl px-4 py-2 flex-1 text-center" onClick={goBack}>
                                    Ir atras
                                </button>
                                {isFavorite ? (
                                    <button className="bg-yellow-300 text-black rounded-3xl px-4 py-2 flex-1 text-center hover:bg-blue-950 hover:text-white" onClick={removeFavorite}>
                                        Remove Favorite
                                    </button>
                                ) : (
                                    <button className="bg-blue-950 text-white rounded-3xl px-4 py-2 flex-1 text-center hover:bg-yellow-300 hover:text-black" onClick={addFavorite}>
                                        Add Favorite
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col min-h-full px-10 justify-between">
                            <div className="flex flex-col justify-center flex-grow">
                                <p className="font-bold text-3xl pb-4">{movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})</p>
                                <p>{movie?.overview}</p>
                            </div>
                            <div className="flex justify-center items-center flex-grow">
                                <a href={`https://www.imdb.com/title/${movie?.imdb_id}`}>
                                    Logo
                                </a>
                            </div>
                            <div className="flex-grow">
                                <ProgressBar value={movie?.vote_average ?? 0}></ProgressBar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="flex mx-64 text-3xl justify-center items-center font-bold my-6">Recommended:</h1>
            <div className="flex flex-row flex-wrap justify-center items-start my-2 mx-40">
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
        </div>
    );
};

export default Show;
