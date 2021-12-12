// librarires
import { useState } from "react"
import {
    Button,
    Modal,
    Form,
    Alert
} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

// services and helpers
import api from "../../services/api.js"

function AdminPass({ states: {
    setMasterAuth,
    pwModal
} }) {

    const navigate = useNavigate();

    // component states
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");

    // given the correct password, execute stored action, then reset states or prompt error
    async function validatePassword() {
        try {
            const response = await api.get("/master", { auth: { password } });
            if (response.status === 200) {
                setPassword("");
                setError("");
                setMasterAuth(true);
            }
        }
        catch (err) {
            console.log(err);
            setError("Unable to authenticate")
        }
    }

    return (
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
                <Alert variant="primary" className="error">Test PW: tractian-challenge</Alert>
                {error && <Alert variant="danger" className="error">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    navigate("/login")
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={validatePassword}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AdminPass;