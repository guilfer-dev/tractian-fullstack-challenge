// libraries
import { Card, Badge, Container, Button } from 'react-bootstrap'

// style
import "./styles.css"

function AssetCard({ data, index, handleDelete, handleModify }) {

    function parseStatus(status) {

        switch (status) {
            case "running":
                return "success";

            case "alerting":
                return "warning";

            case "stopped":
                return "danger";

            default:
                break;
        }
    }

    return (
        <Container>
            <Card className="asset-card">
                <Card.Img variant="top" src={data.img} />
                <Card.Body>
                    <Card.Title className="fs-4 text-center">{data.name}
                        <Badge pill bg={parseStatus(data.status)}
                            text="dark"
                            className="asset-card-subtitle">
                            {data.status.toUpperCase()}
                        </Badge>
                    </Card.Title>
                    <Card.Text>
                        <span className="fw-bold">Model:</span>
                        {` ${data.model}`}
                    </Card.Text>
                    <Card.Text>
                        <span className="fw-bold">Owner:</span>
                        {` ${data.owner}`}
                    </Card.Text>
                    <Card.Text>
                        <span className="fw-bold">Description:</span>
                        {` ${data.description}`}
                    </Card.Text>
                    <Card.Text>
                        <span className="fw-bold">Health level:</span>
                        <input type="range" className="fw-bold slider"
                            value={data.healthLevel} readOnly />
                    </Card.Text>
                    <div className="d-flex justify-content-evenly">
                        <Button variant="primary" onClick={evt => handleModify(evt, index)}>Modify</Button>
                        <Button variant="danger" onClick={evt => handleDelete(evt, index)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card >
        </Container>
    )
}

export default AssetCard;