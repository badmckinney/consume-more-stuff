import React from 'react';
import { Link } from 'react-router-dom';
import './Item.scss';

const Item = props => {
  const { item } = props;

  if (!item.image) {
    item.image = "";
  }

  return (
    <Link to={`/items/${item.id}`}>
      <div className="item">
        <div className="img-container">
          <img src={item.image} className="item-image" alt={item.name} />
        </div>
        <p className="post-date">{item.created_at}</p>
        <h4 className="item-name">{item.name}</h4>
        <p className="item-price">{item.price}</p>
        <p className="item-condition">{item.condition}</p>
      </div>
    </Link>
  )
};

export default Item;