// librarires
import { useState } from "react"
import {
    Button,
    Modal,
    Form,
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

function MainModal({ editionModal, actionTarget, askPassword, clearStates }) {

    // form data
    const [name, setName] = useState("")

    async function updateItem(path, id, data) {
        await api.put(`/${path}/${id}`, data)
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

export default MainModal;