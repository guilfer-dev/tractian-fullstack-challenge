// libraries
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d'
import {
    Container,
    Col,
    Row,
    Tab,
    Tabs,
    Button
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

// variables
import statusChart from "../../variables/charts/statusCharts"
import healthLevelChart from "../../variables/charts/healthLevelChart"

// components
import NavBar from "../../components/NavBar"
import AssetCard from "../../components/AssetCard"
import AssetModal from "../../components/Modals/AssetModal"

// styles
import "./styles.css"
import "./charts.css"

function Main() {

    highcharts3d(Highcharts);

    const [units, setUnits] = useState([])
    const [unitView, setUnitView] = useState("all")
    const [assets, setAssets] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [assetData, setAssetData] = useState({});
    const company = JSON.parse(localStorage.getItem("company"))

    // fetch units data from the api
    useEffect(() => {
        async function getData() {
            if (company._id) {
                const { data: { units } } = await api.get(`/companies/${company._id}`);
                setUnits(units);
            }
        }

        getData();

    }, [company._id])

    // fetch assets data from the api
    useEffect(() => {
        async function getData() {
            if (unitView === "all" && company._id) {
                const { data: assets } = await api.get(`/${company._id}/all-assets`);
                setAssets(assets);
            } else if (unitView._id) {
                const { data: assets } = await api.get(`/units/${unitView._id}/assets`);
                setAssets(assets);
            }
        }

        getData();

    }, [unitView, company._id])

    async function handleDelete(index) {
        const deletion = window.confirm("Você tem certeza sobre deletar essa despesa? A ação não poderá ser desfeita");
        if (deletion) {
            await api.delete(`/assets/${assets[index]._id}`)
            const { data } = await api.get(`/units/${unitView._id}/assets`);
            setAssets(data);
        }
    }

    async function handleModify(index) {
        setShowModal(true);
        setAssetData(assets[index])

    }

    function handleNewAsset() {
        setShowModal(true);
        setAssetData(false);
    }

    return (
        <>
            {/* share states between navbar and main page */}
            <NavBar states={{
                companyName: company.name,
                companyID: company._id,
                unitView,
                setUnitView,
                units
            }} />
            <h1 className="display-1 text-center">{unitView === "all" ? "All" : unitView.name}</h1>
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
                        {/* show button to add new asset only when user is on a a unit tab */}
                        {unitView !== "all" && <Button className="add-new-asset-btn" onClick={handleNewAsset}>Add new asset</Button>}
                        <Container className="cards-container">
                            {/* programmatically loads cards with asssets */}
                            {assets.length > 0 ? assets.map((e, i) => (
                                <AssetCard states={{ data: e, index: i, handleDelete, handleModify }} key={`card-${i}`} />
                            )) :
                                "Network failure or there are no assets available for this unit"
                            }
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
            <AssetModal
                states={{
                    showModal,
                    setShowModal,
                    assetData,
                    setAssetData,
                    setAssets,
                    unitView
                }} />
        </>


    )
}

export default Main;