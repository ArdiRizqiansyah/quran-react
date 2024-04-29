import { Alert, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import Main from '@layouts/Main'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { data } = useFetch(`${import.meta.env.VITE_API_URL}/surat`);

  useEffect(() => {
    const results = data.filter(item => item.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm, data]);

  // make handleSearch function using debounce
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if(timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleDebounceSearch = debounce(handleSearch, 500);

  return (
    <Main>
      <Container className='py-4'>
      <div className='custom-search mb-3'>
        <i className="bi bi-search"></i>
        <input type="text" className='form-control' placeholder='Cari berdasarkan nama surah' onChange={handleDebounceSearch} />
      </div>
        <Row>
          {searchResults.length > 0 ? searchResults?.map((item) => (
            <Col className='col-md-6 col-lg-4 mb-3' key={item.nomor}>
              <Link to={`/surah/${item.nomor}`} className='text-decoration-none'>
                <Card className='card-surah'>
                  <CardBody className='d-flex align-items-center gap-3'>
                    <div className='sub-card fw-semibold'>
                      {item.nomor}
                    </div>
                    <div>
                      <h5 className='fw-semibold text-lg mb-0'>{item.namaLatin}</h5>
                      <p className='text-muted text-sm mb-0'>{item.arti}</p>
                    </div>
                    <div className='sub-card ms-auto'>
                      <p className='text-muted text-sm mb-0'>Ayat</p>
                      <h5 className='fw-semibold mb-0'>
                        {item.jumlahAyat}
                      </h5>
                      <p className='text-muted text-sm mb-0'>{item.tempatTurun}</p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          )) : (
            <Col>
              <Alert variant='light-app' className='text-center rounded-4'>
                <p className='mb-0'>
                  <i className="bi bi-exclamation-circle me-2"></i>
                  Data tidak ditemukan
                </p>
              </Alert>
            </Col>
          )}
        </Row>
      </Container>
    </Main>
  )
}
