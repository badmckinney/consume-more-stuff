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

  if (item.status_id !== 1) {
    return <></>;
  }

  return (
    <>
      <Link to={`/items/${item.id}`}>
        <div className="item">
          <div className="img-container">
            <img src={item.image} className="item-image" alt={item.name} />
          </div>
          <div className="item-detail">
            <p className="post-date">
              <Moment format="MMM M">{localCreatedAt}</Moment>
            </p>
            <h4 className="item-name">{item.name}</h4>
          </div>
          <div className="price-container">
            <p className="item-price">{item.price ? `$ ${item.price}` : ''}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Item;
