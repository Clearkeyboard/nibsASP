import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ProjectDetail from './pages/project-details';
import './App.css';

import Landing from './pages/landing';
function App() {
    return (
        <Container>
            <BrowserRouter>
                <Navbar >
                    <Navbar.Brand as={Link} to="/">NIBS Projects</Navbar.Brand>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/details/:id" element={<ProjectDetail />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;