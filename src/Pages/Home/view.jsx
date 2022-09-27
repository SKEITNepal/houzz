import React, { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import axios from 'axios';
import Item from "Components/Items";

import Placeholder from 'react-bootstrap/Placeholder';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Homapage = (props) => {
    const defaultError = {
        error: false,
        code: 'UNKNOWN',
        message: 'Unknown Error',
    }
    const defaultpage = 1;
    const defaultItems = 3;

    
    const [page, setPage] = useState(defaultpage);
    const [beers, setBeers] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(defaultError)


    async function getBeers() {
        setPage(prev => prev + 1);
        setLoading(true);
        try {
            const beer_api = await axios.get('https://api.punkapi.com/v2/beers', {
                params: {
                    per_page: defaultItems,
                    page
                }
            });

            //throw error even if error sent as response.
            if(beer_api?.error) throw new Error(beer_api.error);

            //extract data and reset loader
            const data = Array.isArray(beer_api?.data) ? beer_api.data : [];
            setLoading(false);
            
            // add beers to list
            setBeers(current => [...current, ...data]);
        } catch (e) {
            setError({
                ...defaultError,
                error: true,
                code: e.code,
                message: e.message
            });
        }
    }

    // function loadMore() {
    //     setPage(prev => prev + 1);
    // }

    // useEffect(() => {
    //     getBeers();

    //     // console.log({page}, {beers});
    //     //remove all beers when unmounted
    //     return () => {
    //         setBeers([]);
    //         setPage(defaultpage);
    //         setError(defaultError);
    //         setLoading(false);
    //     };
    // }, []);

    return (
        <section >
            {error.error &&
                <Alert variant="danger" onClose={() => setError(defaultError)} dismissible>
                    <Alert.Heading>{error.code}</Alert.Heading>
                    <p>{error.message}</p>
                </Alert>}

            {!!beers.length && (
                <div>
                    {beers.map((item_data, index) => (
                        <Item item_data={item_data} />
                    ))}
                </div>
            )}
            <Button onClick={getBeers}>Load More</Button>

            {loading && (
                <>Loading...</>
            )}
        </section>
    );
}

export default Homapage;