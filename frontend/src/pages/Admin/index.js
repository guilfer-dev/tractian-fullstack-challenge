// libraries
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
    Container,
    Navbar,
    Tab,
    Tabs,
    Button,
    Modal,
    Form,
    Table,
    Alert
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

// styles
import "./styles.css"

function Admin() {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [pwModal, setPWModal] = useState(false);
    const [askEditModal, setAskEditModal] = useState(false);
    const [actionTarget, setActionTarget] = useState([]);
    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState("");
    const [showPanel, setShowPanel] = useState(false);
    const [tabKey, setTabKey] = useState("users");
    const [action, setAction] = useState({});
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [units, setUnits] = useState([]);


    useEffect(() => {
        (async () => {
            askPassword(setShowPanel, [true]);
            const { data } = await api.get("/users");
            setUsers(data);
        })()
    }, [])

    useEffect(() => {

        (async () => {
            switch (tabKey) {
                case ("users"): {
                    const { data } = await api.get("/users");
                    setUsers(data);
                    break;
                }
                case ("companies"): {
                    const { data } = await api.get("/companies");
                    setCompanies(data);
                    break;
                }
                case ("units"): {
                    const { data } = await api.get("/units");
                    setUnits(data);
                    break;
                }
                default: {
                    break;
                }
            }
        })();

    }, [tabKey])

    function askPassword(fn, params) {
        setPWModal(true);
        setAction({
            fn,
            params,
        })
    }

    async function validatePassword() {
        try {
            await api.post("/master", { password });
            action.fn(...action.params);
            clearStates();

        }
        catch (err) {
            setError("Unable to authenticate")
        }
    }

    async function deleteItem(path, id) {
        await api.delete(`/${path}/${id}`);
    }

    async function updateItem(path, id, data) {
        await api.put(`/${path}/${id}`, data)
    }

    function clearStates() {
        setAction({});
        setActionTarget([]);
        setAskEditModal(false);
        setError("");
        setPassword("");
        setPWModal(false)
    }

    return (
        <>{showPanel ?
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container className="nav-bar" fluid>
                        <Navbar.Brand>Assets Manager</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="mt-5">
                    <h1 className="text-center"> ADMINISTRATION PANEL</h1>
                    <Container className="mt-5">
                        <Tabs activeKey={tabKey} onSelect={(k) => { askPassword(setTabKey, [k]) }}>
                            <Tab eventKey="users" title="USERS">
                                <Container>
                                    <Button className="add-new-asset-btn">Add new user</Button>
                                    <Table striped hover responsive className="mt-2">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length > 0 && users.map((e, i) =>
                                                < tr key={i} onClick={(evt) => {
                                                    const id = evt.target.closest("tr").querySelector(".id").innerHTML;
                                                    setActionTarget(["users", id]);
                                                    setAskEditModal(true);
                                                }}>
                                                    <td>{e.name}</td>
                                                    <td>{e.accessToken ? "online" : "offline"}</td>
                                                    <td className="id">{e._id}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Container>
                            </Tab>
                            <Tab eventKey="companies" title="COMPANIES">
                                <Container>
                                    <Button className="add-new-asset-btn">Add new company</Button>
                                    <Table striped hover responsive className="mt-2">
                                        <thead>
                                            <tr>
                                                <th>Company</th>
                                                <th>ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {companies.length > 0 && companies.map((e, i) =>
                                                < tr key={i} onClick={(evt) => {
                                                    const id = evt.target.closest("tr").querySelector(".id").innerHTML;
                                                    setActionTarget(["companies", id]);
                                                    setAskEditModal(true);
                                                }}>
                                                    <td>{e.name}</td>
                                                    <td className="id">{e._id}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Container>
                            </Tab>
                            <Tab eventKey="units" title="UNITS">
                                <Container>
                                    <Button className="add-new-asset-btn">Add new unit</Button>
                                    <Table striped hover responsive className="mt-2">
                                        <thead>
                                            <tr>
                                                <th>Unit</th>
                                                <th>Company</th>
                                                <th>ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {units.length > 0 && units.map((e, i) =>
                                                < tr key={i} onClick={(evt) => {
                                                    const id = evt.target.closest("tr").querySelector(".id").innerHTML;
                                                    setActionTarget(["units", id]);
                                                    setAskEditModal(true);
                                                }}>
                                                    <td>{e.name}</td>
                                                    <td>{e.company.name}</td>
                                                    <td className="id">{e._id}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Container>
                            </Tab>
                        </Tabs>
                    </Container >
                </Container >
            </>
            : null
        }
            {/* password modal */}
            <>
                <Modal show={pwModal}>
                    <Modal.Body>
                        <Form.Label className="fw-bold">Master Password</Form.Label>
                        <Form.Control required type="password" id="master-password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>
                            <input type="checkbox" value={password}
                                onClick={() => {
                                    var x = document.getElementById("master-password");
                                    if (x.type === "password") {
                                        x.type = "text";
                                    } else {
                                        x.type = "password";
                                    }
                                }}
                            /> Show Password
                        </label>
                        {error && <Alert variant="danger" className="error">{error}</Alert>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => navigate("/")}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => validatePassword()}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {/* ask edit modal */}
            <>
                <Modal show={askEditModal}>
                    <Modal.Header>
                        <Modal.Title>ACTION</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={clearStates}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => askPassword(deleteItem, actionTarget)}>
                            Delete
                        </Button>
                        <Button variant="primary" onClick={() => setAskEditModal(false)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {/* ask edit modal */}
            <>
                <Modal show={false}>
                    <Modal.Header>
                        <Modal.Title>ACTION</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => validatePassword()}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => setAskEditModal(false)}>
                            Delete
                        </Button>
                        <Button variant="primary" onClick={() => navigate("/")}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}

export default Admin;