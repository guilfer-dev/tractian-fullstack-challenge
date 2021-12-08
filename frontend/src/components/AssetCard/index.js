// libraries
import { Card, Badge, Container } from 'react-bootstrap'

// style
import "./styles.css"

function AssetCard({ data }) {

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
                </Card.Body>
            </Card >
        </Container>
    )
}

export default AssetCard;