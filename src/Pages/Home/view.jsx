import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Item from "Components/Items/view.jsx";

import './style.scss';


import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { BsChevronDown, BsArrowCounterclockwise } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";

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
    const [error, setError] = useState(defaultError)
    const [loading, setLoading] = useState(false);


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

            // add new beer coponents to list
            for (const beer of data) {
                setBeers(current => [...current, getBeerComponent(beer)]);
            }

            {/* Alternative method: instead of adding component, it adds the value and create component later on.*/ }
            // setBeers(current => [...current, ...data]);


        } catch (e) {
            setError({
                ...defaultError,
                error: true,
                code: e.code,
                message: e.message
            });

            setLoading(false);
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
    }, []);


    //scroll to bottom
    const loadMoreButton = useRef(null)

    const scrollToBottom = () => {
        loadMoreButton.current?.scrollIntoView({ block: "start", behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [beers]);

    const getBeerComponent = (item_data) => <Item item_data={item_data} key={'p_' + page + 'i_' + item_data?.id} />;

    return (
        <section className='homepage'>
            {error.error &&
                <Alert variant="danger" onClose={() => setError(defaultError)} dismissible>
                    <Alert.Heading>{error.code}</Alert.Heading>
                    <p>{error.message}</p>
                </Alert>
            }

            {/*Loading all beers component*/}
            {/* Note: this method is needed because this method can cache previously loaded beers and it doesn't need to re-render everthing each time */}
            <div className='items'>
                {beers}
            </div>

            {/* Alternative method: it loads the beer but it will  re-render everything from 0 to n, since it is recreating all beers on each loop.*/}
            {/* {!!beers.length && (
                <div className='items'>
                    {beers.map((item_data) => (
                        <Item item_data={item_data} key={'p_' + page + 'i_' + item_data?.id} />
                    ))}
                </div>
            )} */}

            {/*Load more button at the end */}
            {/*Note: it had not become seperate component because there is a ref on the button */}
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
                    <>
                        {!error.error && <span className='text'>Load More &nbsp;<BsChevronDown className='icon' /> </span>}
                        {error.error && <span className='text'><BsArrowCounterclockwise />&nbsp;Try Again</span>}
                    </>
                    }
                </Button>
            </div>

        </section>
    );
}

export default Homapage;