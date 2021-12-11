import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'

import "./styles.css"

// services
import api from "../../../services/api"

function AssetModal({ states: {
    showAssetModal,
    setShowAssetModal,
    getAssetsData,
    modalData: data,
    unitView
} }) {

    const [error, setError] = useState("");

    // form states
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [model, setModel] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [healthLevel, setHealthLevel] = useState(0);
    const [image, setImage] = useState({});

    // set data on modal based on data set when the modal was prompted
    useEffect(() => {
        setName(data.name || "");
        setOwner(data.owner || "");
        setModel(data.model || "");
        setStatus(data.status || "");
        setDescription(data.description || "");
        setHealthLevel(data.healthLevel || 0);
    }, [data])

    // close modal and clean states

    function clearStates() {
        if (Object.keys(data).length === 0) {
            setName("");
            setOwner("");
            setModel("");
            setStatus("");
            setDescription("");
            setHealthLevel(0);
        }
        setError("");
        setImage({});
        setShowAssetModal(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData()

        // data collected from form
        const newData = {
            name,
            owner,
            model,
            status,
            description,
            healthLevel,
        }

        // grants that only new data is sent to the endpoint
        for (let item in newData) {
            if (newData[item] !== data[item]) {
                form.append(item, newData[item])
            }
        }

        // grants that only if an image is selected, it will be sent to the endpoint
        if (!!image.name) form.append("image", image);

        try {

            //if asset has an id, update otherwise, create new asset
            if (data._id) {
                await api.put(`/assets/${data._id}`, form);
            } else {
                await api.post(`/units/${unitView._id}`, form);
            }

            //reload assets
            getAssetsData();
            clearStates();
        }
        catch (err) {
            setError("Unable to save changes to the asset")
        }
    }

    async function handleCloseModal() {
        clearStates();
    }


    return (
        // prompt user with a form with asset data to be updated or created
        <Modal show={showAssetModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{data ? "Modify asset" : "New asset"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="asset">
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Name</Form.Label>
                        <Form.Control required={!data} className="w-50" type="text" value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Owner</Form.Label>
                        <Form.Control required={!data} className="w-50" type="text" value={owner}
                            onChange={e => setOwner(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Model</Form.Label>
                        <Form.Control required={!data} className="w-50" type="text" value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Status</Form.Label>
                        <Form.Select required={!data} className="w-50" type="text" value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            {["", "running", "alerting", "stopped"].map((e, i) => <option key={i} value={e}>{e}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Description</Form.Label>
                        <Form.Control required={!data} className="w-50" as="textarea" value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-evenly align-items-center mb-2">
                        <Form.Label className="w-25 fw-bold">Health level</Form.Label>
                        <div className="w-50 hl-container">
                            <Form.Control required={!data} type="number" min="0" max="100" className="hl-number-input" value={healthLevel}
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
                        <Form.Control required={!data} className="w-50" type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Group>
                </Form>
                {error && <Alert variant="danger" className="error">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="asset">
                    {data ? "Save Changes" : "Create asset"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AssetModal;