// libraries
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d'
import { Container, Col, Row, Tab, Tabs } from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

// variables
import statusChart from "../../variables/charts/statusCharts"
import healthLevelChart from "../../variables/charts/healthLevelChart"

// components
import NavBar from "../../components/NavBar"
import AssetCart from "../../components/AssetCard"


// styles
import "./styles.css"
import "./charts.css"

function Main() {

    highcharts3d(Highcharts);

    // const navigate = useNavigate();

    const [units, setUnits] = useState([])
    const [unitView, setUnitView] = useState({})
    const [assets, setAssets] = useState([])
    // const { companyName, companyID } = JSON.parse(localStorage.getItem("session"))
    const companyName = "Industria Freios Supremos",
        companyID = "618ecddb6abbb006ecd6e6f7"

    // fetch units data from the api
    useEffect(() => {
        async function getData() {
            const { data: { units } } = await api.get(`/companies/${companyID}`);
            setUnits(units);
            setUnitView(units[0]);

        }

        getData();

    }, [companyID])

    // fetch assets data from the api
    useEffect(() => {
        async function getData() {
            const { data: assets } = await api.get(`/units/${unitView._id}/assets`);
            setAssets(assets);
        }

        getData();

    }, [unitView._id])

    const states = {
        companyName,
        companyID,
        unitView,
        setUnitView,
        units
    }


    return (
        <>
            <NavBar states={states} />
            <h1 className="display-1 text-center">{unitView.name}</h1>
            <Container>
                <Tabs defaultActiveKey="sumary">
                    <Tab eventKey="sumary" title="Sumary">
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={healthLevelChart}
                                    />
                                </Col>
                                <Col md="auto">
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={statusChart}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="assets" title="Assets" >
                        <Container className="cards-container">
                            {assets.length > 0 ? assets.map((e, i) => (
                                <AssetCart data={e} key={`card-${i}`} />
                            )) :
                                "Network failure or there are assets available"
                            }
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
        </>


    )
}

export default Main;