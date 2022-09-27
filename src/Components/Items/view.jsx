import React, { memo } from 'react';
import './style.scss';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Item = ({ item_data, ...props }) => {
    if (!item_data?.id) return null;

    const ingredients = item_data?.ingredients ? Object.keys(item_data.ingredients) : [];
    let ingredients_elem = <span>Ingredients: <br /> {ingredients.toString()}</span>;

    console.log("Rendering... ", item_data.id);

    return (
        <div className='item-container' {...props}>
            <div className='left-img'>
                <OverlayTrigger overlay={<Tooltip>{ingredients_elem}</Tooltip>}>
                    <img src={item_data?.image_url} alt={item_data?.name} />
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

export default memo(Item, (prev, current)=>{
    return prev.item_data.id === current.item_data.id;
});