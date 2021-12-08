// libraries
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

//helpers and services
import api from "../services/api"

function NavBar({ states }) {

    const navigate = useNavigate();

    async function handleExit() {
        await api.get("/logout");
        localStorage.clear();
        navigate("/login");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container className="nav-bar" fluid>
                <Navbar.Brand href="/">Assets Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Navbar.Text>{`${states.companyName}`}</Navbar.Text>
                    </Nav>
                    <Nav>
                        <NavDropdown title={states.unitView.name} id="collasible-nav-dropdown" onSelect={eventKey => states.setUnitView(states.units[eventKey])}>
                            {states.units.map((e, i) => (
                                <NavDropdown.Item key={i} eventKey={i}>{e.name}</NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link onClick={handleExit}>Exit</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;