import React from 'react';
import './style.scss';

const Item = ({ loading = false, ...props }) => {
    const item_data = props?.item_data ? props.item_data : null;

    if(!item_data?.id) return null;

    // console.log({item_data});
    
    return (
        <div className='item-container' {...props}>
            <div className='item-name'>
                {item_data?.name}
            </div>
            
        </div>
    );
}
export default Item;