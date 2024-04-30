import Main from "@layouts/Main";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useSound from "use-sound";
import { useState } from "react";


export default function Surah() {
    //get param id using useParams
    const { id } = useParams();

    // use useFetch to get data surah by id
    const { 
        // make alias data to surah
        data: surah,
    } = useFetch(`${import.meta.env.VITE_API_URL}/surat/${id}`);

    // get all data surah
    const { data: allSurah } = useFetch(`${import.meta.env.VITE_API_URL}/surat`);

    // function play audio
    const PlayButton = ({ sound }) => {
        const [play, { pause }] = useSound(sound, {
            onplay: () => setIsPlaying(true),
            onend: () => setIsPlaying(false),
        });

        const [isPlaying, setIsPlaying] = useState(false);

        const togglePlay = () => {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
            setIsPlaying(!isPlaying);
        };

        return (
            <span className="cursor-pointer" onClick={togglePlay}>
                {isPlaying ? (<i className="bi bi-pause-circle"></i>) : (<i className="bi bi-play-circle"></i>)}
            </span>
        )
    };

    return (
        <Main>
            <section className="bg-light min-vh-100">
                <Container className="py-5">
                    <Row>
                        <Col className="col-lg-3">
                            <Card className="bg-main-app mb-3">
                                <CardBody>
                                    <h6>Surah</h6>
                                    { surah &&
                                        <div className="d-flex align-items-center text-muted bg-muted-app py-1 px-3 gap-2 rounded-3 mb-3">
                                            <p className="mb-0">
                                                {surah.nomor}
                                            </p>
                                            <p className="mb-0">
                                                {surah.namaLatin}
                                            </p>
                                            <p className="mb-0 ms-auto arabic-font">
                                                {surah.nama}
                                            </p>
                                        </div>
                                    }
                                    <div className="d-flex text-muted justify-content-center align-items-center gap-3">
                                        { surah.suratSebelumnya &&
                                            <Link to={`/surah/${surah.suratSebelumnya.nomor}`} className="text-muted">
                                                <i className="bi bi-caret-left"></i>
                                            </Link>
                                        }
                                        { surah.audioFull &&
                                            <PlayButton sound={surah.audioFull["01"]} />
                                        }
                                        { surah.suratSelanjutnya &&
                                            <Link to={`/surah/${surah.suratSelanjutnya.nomor}`} className="text-muted">
                                                <i className="bi bi-caret-right"></i>
                                            </Link>
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="bg-main-app overflow-y-scroll mb-3" style={{ height: '500px' }}>
                                <CardBody>
                                    <p className="text-sm text-muted fw-semibold">
                                        Pilih Surah
                                    </p>
                                    <div className="d-flex flex-column gap-2">
                                        {allSurah && allSurah.map((item, index) => (
                                            <Link key={index} to={`/surah/${item.nomor}`} className="text-decoration-none">
                                                <div className={`d-flex justify-content-between align-items-center text-muted py-1 px-3 rounded-3 ${item.nomor == surah.nomor ? 'bg-muted-app': ''}`}>
                                                    <p className="mb-0">
                                                        {item.nomor}
                                                    </p>
                                                    <p className="mb-0">
                                                        {item.namaLatin}
                                                    </p>
                                                    <p className="mb-0">
                                                        {item.nama}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-lg-9">
                            <Card className="bg-main-app">
                                <CardBody>
                                    {surah.ayat && surah.ayat.map((item, index) => (
                                        <div key={index} className="d-flex align-items-center gap-3 py-4 px-2 border-2 border-bottom">
                                            <div className="d-flex flex-column gap-1 text-center text-md">
                                                <span className="text-nowrap">
                                                    {surah.nomor} : {item.nomorAyat}
                                                </span>
                                                <PlayButton sound={item.audio["01"]} />
                                                {/* <span>
                                                    <i className="bi bi-bookmarks"></i>
                                                </span> */}
                                            </div>
                                            <div className="flex-grow-1 px-3">
                                                <p className="text-end text-xl mb-3 arabic-font">
                                                    {item.teksArab}
                                                </p>
                                                <p className="text-muted text-sm mb-1">
                                                    {item.teksLatin}
                                                </p>
                                                <p className="text-sm mb-0">
                                                    {item.teksIndonesia}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Main>
    )
}
