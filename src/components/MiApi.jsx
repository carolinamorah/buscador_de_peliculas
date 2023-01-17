import {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const MiApi = () => {
    // 3. info guardará los valores traídos desde la API 
    
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movies, setMovies] = useState([]);

    // 2. Llamamos a la función que consume la API al momento de montar el componente 
    useEffect(() => { 
        const getDataFilms = async () => {
            const movieUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=23d83d7d7cd4d153c1035ec520541b49&language=es-ES&page=1';
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
    
            setMovies(movies);
        }

        getDataFilms();
    }, []);

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
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };
    

    return ( 
        <div>
            <Row xs={1} md={3} lg={4} className="g-4 mx-5 my-5">

            {movies.map((movie)=>(
                <Col key={movie.id}>
                    <Card border='border border-0'>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}/>
                        <Card.Body className='text-center card-body'>
                        <Card.Title className='text-light'>{movie.title + " (" + movie.release_date.substring(0,4) + ")"}</Card.Title>
                        <Card.Title className='text-warning'>{movie.vote_average}</Card.Title>
                        <Button className="btn btn-outline-light   bg-transparent" onClick={() => openModal(movie)}>Ver más</Button>
                        </Card.Body>
                        
                    </Card>
                </Col>
            ))}
            </Row>
        
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
