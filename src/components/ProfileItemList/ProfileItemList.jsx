import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItemList = props => {
  const itemList = props.items.map(item => {
    return (
      <Link to={`/items/${item.id}`}>
        <div className="item">
          <div className="status">{item.status.name}</div>
          <div className="manage">
            <Link className="edit-link" to={`/items/${item.id}/edit`}>
              edit post
            </Link>
          </div>
          <div className="name">{item.name}</div>
          <div className="category">{item.category.name}</div>
          <div className="timestamps">
            <div className="create-at">{item.created_at}</div>
            <div className="updated-at">updated: {item.updated_at}</div>
          </div>
          <div className="views">{item.views}</div>
          <div className="id">{item.id}</div>
        </div>
      </Link>
    );
  });

  return <div className="item-list">{itemList}</div>;
};

export default ProfileItemList;
