// librarires
import { useState, useEffect } from "react"
import {
    Button,
    Modal,
    Form,
    Alert
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

//prompt user for new data for given field
function AdminNewData({ states: {
    newDataModal,
    actionTarget,
    clearStates,
    askPassword,
    refreshData
} }) {

    const [error, setError] = useState("");

    // form data
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [locationData, setLocationData] = useState("")

    // load new information about where the data will be placed only if the action target has changed
    useEffect(() => {
        if (actionTarget[0] === "new-user" ||
            actionTarget[0] === "new-unit") {
            (async () => {
                const { data } = await api.get("/companies");
                console.log(data)
                setLocationData(data);
            })();
        }

    }, [actionTarget]);


    // create item into db
    async function newItem(path, data) {
        await api.post(`/${path}`, data)

        switch (path) {
            case "new-user":
                path = "users"
                break;
            case "new-company":
                path = "companies"
                break;
            case "new-unit":
                path = "units"
                break;

            default:
                break;
        }
        refreshData(path);

    }
    function handleSubmit(e) {
        e.preventDefault();
        try {
            askPassword(newItem, [...actionTarget, { name, company }])
            setName("");
            setCompany("");
            setLocationData("");
        } catch (err) {
            setError("Not able to create item")
        }
    }

    return (
        // prompt user for new data to be created
        <Modal show={newDataModal} >
            <Modal.Header>
                <Modal.Title>{`${actionTarget.length > 0 && actionTarget[0].toUpperCase()}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="new-data">
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Name</Form.Label>
                        <Form.Control required type="text" value={name} className="w-50"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    {locationData && <>
                        <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                            <Form.Label className="w-25 fw-bold">Company</Form.Label>
                            <Form.Select required className="w-50" type="text" value={company}
                                onChange={e => setCompany(e.target.value)}
                            >
                                <option></option>
                                {locationData.map((e, i) => <option key={i} value={e.name}>{e.name}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </>}
                </Form>
                {error && <Alert variant="danger" className="error">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    clearStates();
                    setName("");
                    setCompany("");
                    setLocationData("");
                }}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" form="new-data">
                    Save channges
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default AdminNewData;