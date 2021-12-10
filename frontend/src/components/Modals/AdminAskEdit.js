// librarires
import {
    Button,
    Modal
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

// prompt user if they want to edit or delete given data
function AdminAskEdit({ states: {
    askEditModal,
    clearStates,
    actionTarget,
    askPassword,
    setEditionModal
} }) {
    // delete item if requested
    async function deleteItem(path, id) {
        await api.delete(`/${path}/${id}`);
    }

    return (
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
                <Button variant="primary" onClick={() => setEditionModal(true)}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AdminAskEdit;