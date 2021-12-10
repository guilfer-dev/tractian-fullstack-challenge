// librarires
import { useState } from "react"
import {
    Button,
    Modal,
    Form,
    Alert
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

//prompt user for new data for given field
function AdminEdit({ states: {
    editionModal,
    actionTarget,
    clearStates,
    askPassword,
    refreshData
} }) {

    // form data
    const [name, setName] = useState("")

    //update db
    async function updateItem(path, id, data) {
        await api.put(`/${path}/${id}`, data)
        refreshData(path);
    }

    return (
        <Modal show={editionModal} >
            <Modal.Header>
                <Modal.Title>{`EDIT ${actionTarget.length > 0 && actionTarget[0].toUpperCase()}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control required type="text" id="master-password" value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Alert variant="danger" className="error">Due to major implications, only "name" can be updated</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={clearStates}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => askPassword(updateItem, [...actionTarget, { name }])}>
                    Save channges
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default AdminEdit;