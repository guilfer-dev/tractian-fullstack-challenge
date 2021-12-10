// libraries
import "dotenv/config";
import { Card, Badge, Container, Button } from 'react-bootstrap'

// style
import "./styles.css"

function AssetCard({ states: {
    data,
    index,
    handleDelete,
    handleModify
} }) {

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
        // render new asset based on given asset list
        <Container>
            <Card className="asset-card">
                <Card.Img className="card-img" variant="top" src={`${process.env.REACT_APP_IMG_URL}/${data.image}`} />
                <Card.Body>
                    <Card.Title className="fs-4 text-center card-title">{data.name}
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
                        <Button variant="primary" onClick={() => handleModify(index)}>Modify</Button>
                        <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card >
        </Container>
    )
}

export default AssetCard;