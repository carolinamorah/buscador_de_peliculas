import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const InfoMovies = (movie) => {
    const [lgShow, setLgShow] = useState(false);

    return (
        <>
        <Button className="btn btn-outline-light bg-transparent" onClick={() => setLgShow(true)}>Ver más</Button>
        <Modal
            size="xl"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            key = {movie.id}
        >
            <Modal.Header closeButton >
            <Modal.Title id="example-modal-sizes-title-lg">
                Título
            </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
            bvbbbbvbv
            
            </Modal.Body>
        </Modal>
        </>
    );
}

export default InfoMovies;