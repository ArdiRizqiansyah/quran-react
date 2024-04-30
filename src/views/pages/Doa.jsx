/* eslint-disable react/prop-types */
import Main from "@layouts/Main";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

export default function Doa() {
    const [doa, setDoa] = useState({});
    const { data: judul } = useFetch('https://open-api.my.id/api/doa');
    const { data: defaultDoa, loading } = useFetch('https://open-api.my.id/api/doa/1');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (defaultDoa) {
            setDoa(defaultDoa);
        }
    }, [defaultDoa]);

    useEffect(() => {
        const results = judul.filter(item => item.judul.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    }, [searchTerm, judul])

    const handleGetDoa = async (id) => {
        const res = await axios.get(`https://open-api.my.id/api/doa/${id}`);
        setDoa(res.data);
    }

    const ComponentDoa = ({ data }) => {
        return (
            <>
                <div className="py-4 px-2">
                    <div className="flex-grow-1 px-3">
                        <h5 className="text-center fw-bold mb-5">{data.judul}</h5>
                        <p className="text-end text-xl mb-3 arabic-font">
                            {data.arab}
                        </p>
                        <p className="text-muted text-sm mb-1">
                            {data.latin}
                        </p>
                        <p className="text-sm mb-0">
                            {data.terjemah}
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Main>
            <section className="bg-light min-vh-100">
                <Container className="py-5">
                    <Row>
                        <Col className="col-12 col-lg-4">
                            <Card className="bg-main-app overflow-y-scroll mb-3" style={{ height: '500px' }}>
                                <CardBody>
                                    <div className='custom-search mb-3'>
                                        <i className="bi bi-search"></i>
                                        <input type="text" className='form-control' onChange={e => setSearchTerm(e.target.value)} placeholder='Cari doa' />
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        {searchResults.length > 0 ? searchResults.map(data => (
                                            <div key={data.id} onClick={() => handleGetDoa(data.id)} className={`text-decoration-none text-muted py-1 px-3 cursor-pointer rounded-3 ${doa.id == data.id ? 'bg-muted-app' : ''}`}>
                                                <p className="mb-0">{data.id}. {data.judul}</p>
                                            </div>
                                        )) : (
                                            <p className="text-muted text-center">
                                                Tidak ada data
                                            </p>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-8">
                            <Card className="bg-main-app">
                                <CardBody>
                                    {!loading && (Object.keys(doa).length > 0 ? <ComponentDoa data={doa} /> : <ComponentDoa data={defaultDoa} />)}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Main>
    )
}
