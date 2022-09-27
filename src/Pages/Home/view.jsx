import React, { useRef, useState } from 'react';
import axios from 'axios';
import Item from "Components/Items";

import './style.scss';


import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Spinner from "react-bootstrap/Spinner";
import { useEffect } from 'react';

const Homapage = (props) => {
    const defaultError = {
        error: false,
        code: 'UNKNOWN',
        message: 'Unknown Error',
    }
    const defaultpage = 1;
    const defaultItems = 10;


    const [page, setPage] = useState(defaultpage);
    const [beers, setBeers] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(defaultError)


    async function getBeers() {
        setLoading(true);
        try {
            const beer_api = await axios.get('https://api.punkapi.com/v2/beers', {
                params: {
                    per_page: defaultItems,
                    page
                }
            });

            setPage(prev => prev + 1);
            //throw error even if error sent as response.
            if (beer_api?.error) throw new Error(beer_api.error);

            //extract data and reset loader
            const data = Array.isArray(beer_api?.data) ? beer_api.data : [];
            setLoading(false);

            // add beers to list
            if (!loading) setBeers(current => [...current, ...data]);
        } catch (e) {
            setError({
                ...defaultError,
                error: true,
                code: e.code,
                message: e.message
            });
        }
    }

    useEffect(() => {
        getBeers();

        return () => {
            setBeers([]);
            setPage(defaultpage);
            setError(defaultError);
            setLoading(false);
        }
    }, [props]);


    //scroll to bottom
    const loadMoreButton = useRef(null)

    const scrollToBottom = () => {
        loadMoreButton.current?.scrollIntoView({ block: "start", behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [loading]);

    return (
        <section >
            {error.error &&
                <Alert variant="danger" onClose={() => setError(defaultError)} dismissible>
                    <Alert.Heading>{error.code}</Alert.Heading>
                    <p>{error.message}</p>
                </Alert>}

            {!!beers.length && (
                <div>
                    {beers.map((item_data) => (
                        <Item item_data={item_data} key={'p_' + page + 'i_' + item_data?.id} />
                    ))}
                </div>
            )}
            <div className='load-more-container'>
                <Button
                    className='load-more-botton'
                    onClick={getBeers}
                    ref={loadMoreButton}
                    disabled={loading}
                >{loading ?
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> :
                    <span className='text'>
                        Load More
                    </span>
                    }</Button>
            </div>

        </section>
    );
}

export default Homapage;