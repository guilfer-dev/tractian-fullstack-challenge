// libraries
import { useState, useEffect, useCallback } from "react";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d'
import {
    Container,
    Col,
    Row,
    Tab,
    Tabs,
    Button,
    Alert
} from 'react-bootstrap'

// services and helpers
import api from "../../services/api.js"

// variables
import statusChart from "../../variables/charts/statusChart"
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
    const [showAssetModal, setShowAssetModal] = useState(false);
    const [modalData, setModalData] = useState({});


    const company = JSON.parse(localStorage.getItem("company"))

    // fetch units data from the api
    useEffect(() => {
        (async () => {
            if (company._id) {
                const { data: { units } } = await api.get(`/companies/${company._id}`);
                setUnits(units);
            }
        })();
    }, [company._id])

    const getAssetsData = useCallback(async function () {
        if (unitView === "all" && company._id) {
            const { data: assets } = await api.get(`/${company._id}/all-assets`);
            setAssets(assets);
        } else if (unitView._id) {
            const { data: assets } = await api.get(`/units/${unitView._id}/assets`);
            setAssets(assets);
        }
    }, [unitView, company._id])

    // fetch assets data from the api
    useEffect(() => {
        getAssetsData();
    }, [getAssetsData, unitView, company._id])

    async function handleDelete(index) {
        const deletion = window.confirm("Você tem certeza sobre deletar essa despesa? A ação não poderá ser desfeita");
        if (deletion) {
            await api.delete(`/assets/${assets[index]._id}`)
            const { data } = await api.get(`/units/${assets[index].unit}/assets`);
            setAssets(data);
        }
    }

    function handleModal(data) {
        setShowAssetModal(true);
        setModalData(data || {});
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
            <h1 className="display-1 text-center">{unitView === "all" ? "ALL" : unitView.name.toUpperCase()}</h1>
            <Container>
                <Tabs defaultActiveKey="sumary">
                    <Tab eventKey="sumary" title="Sumary">
                        <Alert variant="danger" className="error">Feature under development: This charts don't represent actual data!</Alert>
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

                        {unitView !== "all" &&
                            <Button className="add-new-asset-btn"
                                onClick={() => handleModal()}>Add new asset</Button>}

                        <Container className="cards-container">
                            {/* programmatically loads cards with asssets */}
                            {assets.length > 0 ? assets.map((e, i) => (
                                <AssetCard states={{ data: e, index: i, handleDelete, handleModal }} key={`card-${i}`} />
                            )) :
                                "Network failure or there are no assets available for this unit"
                            }
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
            <AssetModal
                states={{
                    showAssetModal,
                    setShowAssetModal,
                    getAssetsData,
                    unitView,
                    modalData
                }} />
        </>


    )
}

export default Main;