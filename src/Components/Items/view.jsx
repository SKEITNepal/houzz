import React from 'react';
import './style.scss';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useState } from 'react';

const Item = ({ loading = false, ...props }) => {
    const item_data = props?.item_data ? props.item_data : null;
    const [load, setLoad] = useState(false);

    if (!item_data?.id) return null;

    const ingredients = item_data?.ingredients ?  Object.keys(item_data.ingredients) : [];
    let ingredients_str = "Ingredients: " + ingredients.toString();
    
    console.log({ item_data });

    return (
        <div className='item-container' {...props}>
            <div className='left-img'>
                <OverlayTrigger overlay={<Tooltip>{ingredients_str}</Tooltip>}>
                        <img src={item_data?.image_url} />
                </OverlayTrigger>
            </div>
            <div className='right-content'>
                <div className='item-name'>
                    {item_data?.name}
                </div>
                <div className='item-tagline'>
                    {item_data?.tagline}
                </div>
                <div className='item-desc'>
                    {item_data?.description}
                </div>
            </div>

        </div>
    );
}
export default Item;