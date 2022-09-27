import React from 'react';
import './style.scss';

const Item = (props)=>{
    const item_data = props?.item_data ? props.item_data : null;

    if(!item_data?.id) return null;
    return(
        <div className='item-container' key={item_data.id}>
            {item_data?.name}
        </div>
    );
}
export default Item;