import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './Item.scss';

const Item = props => {
  const { item } = props;
  const localCreatedAt = new Date(item.created_at);

  if (!item.image) {
    item.image = '';
  }

  return (
    <>
      <Link to={`/items/${item.id}`}>
        <div className="item">
          <div className="img-container">
            <img src={item.image} className="item-image" alt={item.name} />
          </div>
          <p className="post-date">
            <Moment format="MMM M">{localCreatedAt}</Moment>
          </p>
          <h4 className="item-name">{item.name}</h4>
          <p className="item-price">{item.price}</p>
        </div>
      </Link>
    </>
  );
};

export default Item;
