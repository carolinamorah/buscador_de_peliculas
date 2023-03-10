import {useState, useEffect} from 'react'
import {Card, Col, Row, Button, Modal} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spiner from './Spiner';


const MiApi = ({busqueda}) => {
    //info guardará los valores traídos desde la API    
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const [page, setPage] = useState(1);
    const [moviesByPage, setMoviesByPage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const pageLimit = 2

    const loadMore =(() => {
        if (page < pageLimit) {
            setPage(prevPage => prevPage + 1);
        }
    })
    // Llamamos a la función que consume la API al momento de montar el componente 
    useEffect(() => { 
        setIsLoading(true);
        const getDataFilms = async () => {
            const movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=23d83d7d7cd4d153c1035ec520541b49&language=es-ES&page=${page}`;
            const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=23d83d7d7cd4d153c1035ec520541b49&language=es-ES';

            const [movieResponse, genreResponse] = await Promise.all([
                fetch(movieUrl),
                fetch(genreUrl)
            ]);
    
            const movieData = await movieResponse.json();
            const genreData = await genreResponse.json();
            
            const genres = genreData.genres;
            
            const moviePromises = movieData.results.map(movie => getMovieDetails(movie, genres));
            const movies = await Promise.all(moviePromises);

            setMoviesByPage((prevMovies) => {
                return {...prevMovies, [page]: movies}
            });
            
            setIsLoading(false);
        }

        getDataFilms();
    
    }, [page]);

    const getMovieDetails = async (movie, genres) => {
        const creditUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=23d83d7d7cd4d153c1035ec520541b49`;
        const creditResponse = await fetch(creditUrl);
        const creditData = await creditResponse.json();
        movie.genres = movie.genre_ids.map(id => {
            return genres.find(genre => genre.id === id).name
        });
        movie.director = creditData.crew.find(person => person.job === "Director").name;

        return movie;
    }

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };
    
    const allMovies = Object.values(moviesByPage).flat();

    return ( 
        <div>
            <InfiniteScroll 
            dataLength={allMovies.length} 
            hasMore={true} 
            next={loadMore}
            loader={isLoading ? <Spiner /> : null}
            >
                <Row xs={1} md={3} lg={4} className="movies g-4 my-5">

                {allMovies.filter((pel)=> {
                    if (busqueda === '') {
                        return pel;
                    } else if(pel.title.toLowerCase().includes(busqueda.toLowerCase())|| 
                                pel.director.toLowerCase().includes(busqueda.toLowerCase())){
                    
                                return pel
                    } else {
                        return pel.genres.find(genre => genre.toLowerCase().includes(busqueda.toLowerCase()));
                    }
                // películas ordenadas por puntaje con .sort
                }).sort((a, b) => b.vote_average - a.vote_average).map((movie) => (
                    <Col key={movie.id + movie.title}>
                        <Card border='border border-0 h-100' className='card-movie'>
                            <Card.Img className="img" variant="top" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}/>
                            <Card.Body className='text-center card-body' >
                            <Card.Title className='text-light'>{movie.title + " (" + movie.release_date.substring(0,4) + ")"}</Card.Title>
                            <Card.Title className='text-warning'>{movie.vote_average}</Card.Title>
                            <Button className="btn btn-outline-light mt-3 bg-transparent" onClick={() => openModal(movie)}>Ver más</Button>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                ))}
                </Row>
            </InfiniteScroll>
            <Modal
                className='myModal'
                size="xl"
                show={modalIsOpen}
                onHide={() => closeModal()}
                aria-labelledby="example-modal-sizes-title-lg"

            >
                {selectedMovie ? (
                <div className='d-grid' key={selectedMovie.id}>
                    <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
                    <img id="modal-img" src={`https://image.tmdb.org/t/p/w300/${selectedMovie.poster_path}`} alt="movie.id" />
                    <div id="overview" className='text-light'>
                        <h1>{selectedMovie.title + " (" + selectedMovie.release_date.substring(0,4) + ")"}</h1>
                        <p>{selectedMovie.overview}</p>
                        <p><strong>Géneros: </strong>{selectedMovie.genres.join(", ")}</p>
                        <p><strong>Director: </strong>{selectedMovie.director}</p>
                        <p><strong>Fecha de estreno: </strong>{selectedMovie.release_date}</p>
                        <p className='text-warning'><strong>Nota: {selectedMovie.vote_average}</strong></p>
                    </div>
                    <button type="button" className="button-modal btn btn-light" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </Modal> 
        </div>
    );
};

export default MiApi