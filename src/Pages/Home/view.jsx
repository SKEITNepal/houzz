import React, { useState, useRef, useCallback, useEffect, forwardRef} from 'react';
// import {} from 'react-bootstrap';

import axios from 'axios';
import Item from "Components/Items";

import Button from "react-bootstrap/Button";

const Homapage = (props) => {
    const [page, setPage] = useState(1);
    const [beers, setBeers] = useState([])
    const [loading, setLoading] = useState(false)
    
    
    async function getBeers() {
        setLoading(true)
        
        const { data } = await axios.get('https://api.punkapi.com/v2/beers', {
            params: {
                per_page: 3,
                page
            }
        });

        console.log({page});
        
        setLoading(false);
        setBeers(current => [...current, ...data]);
        setPage(prev=>prev +  1);
    }
    
    useEffect(() => {
        getBeers();
        console.log({beers});

        //remove all beers when unmounted
        return ()=>{
            setBeers([]);
            setPage(1);
        };
    }, [])
    
    return (
        <section >
            {!!beers.length && (
                <div>
                    {beers.map((item_data, index) => (
                        <Item item_data = {item_data}/>
                    ))}
                </div>
            )}

            <Button>Load More</Button>
            
            {loading && (
                <>Loading...</>
            )}
        </section>
    );
}

export default Homapage;