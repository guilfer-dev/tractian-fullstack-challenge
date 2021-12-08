// libraries
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

//helpers and services
import api from "../../services/api.js"

//styles
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import "./styles.css"

function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { status } = await api.get("/me");
            if (status === 200) navigate("/");
        })();
    }, [navigate])

    const [loginID, setloginID] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const {
                data: {
                    token,
                    company
                }
            } = await api.post("/login", { loginID });

            localStorage.setItem("company", JSON.stringify(company))
            localStorage.setItem("token", token)

            navigate("/")
        }
        catch (err) {
            setError("Login failed")
        }
    }

    return (
        <Container className="container-login">
            <Card className="login-form">
                <Card.Body>
                    <Card.Title className="fs-4 text-center">
                        Wellcome to <br />
                        Assets Manager</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Login ID"
                                onChange={e => setloginID(e.target.value)}
                            />
                        </Form.Group>
                        {error && <Alert variant="danger" className="error">{error}</Alert>}
                        <Button variant="primary" type="submit" className="login-form-btn">
                            Enter
                        </Button>
                    </Form>
                </Card.Body>
            </Card >
        </Container>
    )
}

export default Login;