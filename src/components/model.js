import { useEffect, useState } from 'react';
import { Container, Modal, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Model({ show, setShow, data }) {
    const handleClose = () => setShow(false);

    const [cast, setcast] = useState([])

    function topcrew(res) {

        const filteredArray = res.filter(item =>
            item.known_for_department === "Directing" ||
            item.known_for_department === "Sound" ||
            item.known_for_department === "Acting"
        );


        console.log(filteredArray);
        const top3Entries = filteredArray.slice(0, 3);

        const remainingEntries = res.filter(item =>
            !top3Entries.includes(item) && item.known_for_department === "Directing"
        ).slice(0, 2);

        const totalEntries = [...remainingEntries, ...top3Entries];

        setcast(totalEntries)
    }
    async function getcelebs(id) {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`)
        const res = await data.json()

        if (res && show)
            topcrew(res.cast)



    }
    useEffect(() => {
        getcelebs(data.id)
    }, [data])

    return (
        <Modal show={show} onHide={handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body >
                <Container className='d-flex align-items-center overflow-hidden my-1'>
                    <div className="d-flex flex-column gap-2">
                        <img src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`} alt="" />
                        <Link to={`/watch/${data.id}`}>
                            <Button variant='danger' className='w-100'> Watch
                            </Button>
                        </Link>
                    </div>
                    <div className="m-2 text-left " >
                        <h1>{data.title}</h1>
                        <div className='d-flex flex-roe gap-3 my-2'>
                            <h4>{data.release_date}</h4>
                            <h4>{data.vote_average}</h4>
                        </div>
                        <p>{data.overview}</p>
                        <div className="d-flex flex-wrap gap-2 " >

                            {
                                cast.map((celb, i) => (
                                    <div key={i}>

                                        <Image src={`https://image.tmdb.org/t/p/w400/${celb.profile_path}`} height={120} width={120} style={{ objectFit: 'cover' }} roundedCircle />
                                        <li style={{ listStyle: 'none' }}>{celb.name}</li>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Model;
