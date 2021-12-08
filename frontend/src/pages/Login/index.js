// libraries
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";

//helpers and services
// import api from "../../services/api.js"

//styles
import { Container, Card, Form, Button } from 'react-bootstrap'
import "./styles.css"

function Login() {

    const navigate = useNavigate();

    // const [loginID, setloginID] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();

        // const {
        //     data: {
        //         _id: userID,
        //         name: userName,
        //         company: { _id: companyID, name: companyName }
        //     }
        // } = await api.post("/login", { loginID });

        // localStorage.setItem("session", JSON.stringify({ userID, userName, companyID, companyName }))

        navigate("/")
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
                            <Form.Control type="e-mail" placeholder="E-mail" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password"
                            // onChange={e => setloginID(e.target.value)}
                            />
                        </Form.Group>
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