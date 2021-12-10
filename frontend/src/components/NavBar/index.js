// libraries
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

// helpers and services
import api from "../../services/api"

// styles
import "./styles.css"

function NavBar({ states }) {

    const navigate = useNavigate();

    async function handleExit() {

        await api.get("/logout").finally(() => {
            localStorage.clear();
            navigate("/login");
        })
    }

    return (
        // render navbar with unit and company and change data displayed into the main component
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container className="nav-bar" fluid>
                <Link to="/" className="brand-link"><Navbar.Brand>Assets Manager</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Navbar.Text className="me-3 company-name">{`${states.companyName}`}</Navbar.Text>
                    </Nav>
                    <Nav className="navbar-unit">
                        <Navbar.Text className="me-1 ">Unit(s):</Navbar.Text>
                        <NavDropdown className="p-0" title={states.unitView.name || "All"} id="collasible-nav-dropdown"
                            onSelect={eventKey =>
                                eventKey === "all" ? states.setUnitView("all") : states.setUnitView(states.units[eventKey]
                                )}>
                            <NavDropdown.Item eventKey={"all"}>ALL</NavDropdown.Item>
                            {states.units.map((e, i) => (
                                <NavDropdown.Item className="unit-name" key={i} eventKey={i}>{e.name}</NavDropdown.Item>
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