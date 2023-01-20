import Spinner from 'react-bootstrap/Spinner';

function Spiner() {
    return (
        <Spinner animation="border" variant="light" className='spinner' role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default Spiner;