import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'

import "./styles.css"

// services
import api from "../../services/api"

function ModifyAssetModal({ showModal, setShowModal, data, setData, setAssets, unitView }) {

    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [model, setModel] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [healthLevel, setHealthLevel] = useState("");

    useEffect(() => {
        setName(data.name);
        setOwner(data.owner);
        setModel(data.model);
        setStatus(data.status);
        setDescription(data.description);
        setHealthLevel(data.healthLevel);
    }, [data])

    async function handleCloseModal(e) {
        e.preventDefault();
        setData({});
        setShowModal(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        console.log(form)
        try {

            await api.put(
                `/assets/${data._id}`,
                form,
                {
                    headers: { "content-type": "multipart/form-data" }
                });
            const { data: assets } = await api.get(`/units/${unitView._id}/assets`);
            setAssets(assets);
            setData({});
            setShowModal(false);
        }
        catch (err) {
            setError("Unable to save changes to the asset")
        }
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modify Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="asset">
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Name</Form.Label>
                        <Form.Control className="w-50" type="text" value={name} name="name"
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Owner</Form.Label>
                        <Form.Control className="w-50" type="text" value={owner} name="owner"
                            onChange={e => setOwner(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Model</Form.Label>
                        <Form.Control className="w-50" type="text" value={model} name="model"
                            onChange={e => setModel(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Status</Form.Label>
                        <Form.Control className="w-50" type="text" value={status} name="status"
                            onChange={e => setStatus(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Description</Form.Label>
                        <Form.Control className="w-50" as="textarea" value={description} name="description"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Health level</Form.Label>
                        <div className="w-50 hl-container">
                            <Form.Control type="number" min="0" max="100" className="hl-number-input" value={healthLevel} name="healthLevel"
                                onChange={e => setHealthLevel(e.target.value)}
                            />
                            <input type="range"
                                className="fw-bold slider slider-editable"
                                min="0"
                                max="100"
                                value={healthLevel}
                                onChange={e => setHealthLevel(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Image</Form.Label>
                        <Form.Control className="w-50" type="file" name="image" />
                    </Form.Group>
                </Form>
                {error && <Alert variant="danger" className="error">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="asset">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModifyAssetModal;