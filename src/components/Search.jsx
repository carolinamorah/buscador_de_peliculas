import React, {useState} from 'react';
import {Container, Form, Navbar, Button} from 'react-bootstrap';

const Search = ({setBusqueda}) => {
    const [valorInput, setValorInput] = useState('')
    //Función para capturar el input del buscador

    return (
        <Navbar expand="lg" className='border-rounded navbar-dark'>
        <Container fluid className='ms-5'>
            <Navbar.Brand className="title-page fs-2 mx-auto" href="App">Movies App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex col-10">
                <Form.Control
                type="search"
                placeholder="título, género o director"
                className="me-1 ms-5"
                aria-label="Search"
                onChange={(e) => setValorInput(e.target.value)}
                />
                <Button onClick={() => setBusqueda(valorInput)} className='btn-search w-20'>Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>

    );
};

export default Search