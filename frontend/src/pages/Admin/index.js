// libraries
import React, { useState, useEffect } from "react";

import {
    Container,
    Navbar,
    Tab,
    Tabs,
    Button,
    Table
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

// components

import AdminAskEdit from "../../components/Modals/AdminAskEdit"
import AdminNewData from "../../components/Modals/AdminNewData"
import AdminEdit from "../../components/Modals/AdminEdit"
import AdminPass from "../../components/Modals/AdminPass"

// styles
import "./styles.css"

function Admin() {

    // modals and views
    const [pwModal, setPWModal] = useState(false);
    const [askEditModal, setAskEditModal] = useState(false);
    const [editionModal, setEditionModal] = useState(false);
    const [newDataModal, setNewDataModal] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [tabKey, setTabKey] = useState("users");

    // actions
    const [action, setAction] = useState({});
    const [actionTarget, setActionTarget] = useState([]);

    // api data
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [units, setUnits] = useState([]);

    // show panel when master password is correct
    useEffect(() => {
        (async () => {
            askPassword(setShowPanel, [true]);
            const { data } = await api.get("/users");
            setUsers(data);
        })()
    }, [])

    // ask for password and update data from api
    useEffect(() => {

        refreshData(tabKey)

    }, [tabKey])

    async function refreshData(info) {
        switch (info) {
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
    }

    // handler for asking password
    function askPassword(fn, params) {
        setPWModal(true);
        // define action that will be used after the correct input of the password
        setAction({
            fn,
            params,
        })
    }

    // clear all action and modal states
    function clearStates() {
        setAction({});
        setActionTarget([]);
        setAskEditModal(false);
        setPWModal(false);
        setEditionModal(false);
        setNewDataModal(false);
    }

    return (
        <>{showPanel ?
            <>
                {/* navbar with only the name of the aplication, once there will be no other funcionality */}
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container className="nav-bar" fluid>
                        <Navbar.Brand>Assets Manager</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="mt-5">
                    <h1 className="text-center"> ADMINISTRATION PANEL</h1>
                    {/* container with tables reggarding each administration task and infos */}
                    <Container className="mt-5">
                        <Tabs activeKey={tabKey} onSelect={(k) => { askPassword(setTabKey, [k]) }}>
                            <Tab eventKey="users" title="USERS">
                                <Container>
                                    <Button className="add-new-asset-btn" onClick={() => {
                                        setActionTarget(["new-user"]);
                                        setNewDataModal(true);
                                    }}> new user</Button>
                                    <Table striped hover responsive className="mt-2">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Company</th>
                                                <th>Login ID</th>
                                                <th>ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length > 0 && users.map((e, i) =>
                                                < tr key={i} onClick={(evt) => {
                                                    const id = evt.target.closest("tr").querySelector(".id").innerHTML;
                                                    setActionTarget(["users", id]);
                                                    setAskEditModal(setNewDataModal);
                                                }}>
                                                    <td>{e.name}</td>
                                                    <td>{e.company.name}</td>
                                                    <td>{e.loginID}</td>
                                                    <td className="id">{e._id}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Container>
                            </Tab>
                            <Tab eventKey="companies" title="COMPANIES">
                                <Container>
                                    <Button className="add-new-asset-btn" onClick={() => {
                                        setActionTarget(["new-company"]);
                                        setNewDataModal(true);
                                    }}>Add new company</Button>
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
                                    <Button className="add-new-asset-btn" onClick={() => {
                                        setActionTarget(["new-unit"]);
                                        setNewDataModal(true);
                                    }}>Add new unit</Button>
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
            {/* render modals */}
            <AdminAskEdit states={{ askEditModal, setEditionModal, actionTarget, askPassword, clearStates, refreshData }} />
            <AdminEdit states={{ editionModal, actionTarget, askPassword, clearStates, refreshData }} />
            <AdminNewData states={{ newDataModal, actionTarget, askPassword, clearStates, refreshData }} />
            <AdminPass states={{ pwModal, action, clearStates }} />
        </>
    )
}

export default Admin;