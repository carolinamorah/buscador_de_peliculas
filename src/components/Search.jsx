import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Search = (Props) => {
    //Función para capturar el input del buscador
    const buscarPeliculas = (e) => Props.setBusqueda(e.target.value);

    return (
        <Navbar expand="lg" className='border-rounded navbar-dark mx-auto'>
        <Container fluid>
            <Navbar.Brand className="fs-2 mx-auto" href="#">Solo Estrenos</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex col-10">
                <Form.Control
                type="search"
                placeholder="Búsqueda por título, género o director"
                className="me-2 ms-5"
                aria-label="Search"
                onChange={buscarPeliculas}
                />
                <Button className='btn-search'>Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>

    );
};

export default Search
