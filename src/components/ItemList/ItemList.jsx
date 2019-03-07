import React from 'react';
import Item from '../Item';
import './ItemList.scss';

const ItemList = props => {
  const items = props.items.map(item => {
    return <Item key={item.id} item={item} />;
  });

  return <div className="item-list">{items}</div>;
};

export default ItemList;
