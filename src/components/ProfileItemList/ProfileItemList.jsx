import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './ProfileItemList.scss';

const ProfileItemList = props => {
  const itemList = props.items.map(item => {
    const localCreatedAt = new Date(item.created_at);
    const localUpdatedAt = new Date(item.updated_at);

    return (
      <div className="item" key={item.id}>
        <Link to={`/items/${item.id}`}>
          <div className="status">{item.status.name}</div>
        </Link>
        <div className="manage">
          <Link className="edit-link" to={`/items/${item.id}/edit`}>
            edit post
          </Link>
        </div>
        <Link to={`/items/${item.id}`} key={item.id}>
          <div className="name">{item.name}</div>
          <div className="category">{item.category.name}</div>
          <div className="timestamps">
            <div className="created-at">
              <Moment format="LLL">{localCreatedAt}</Moment>
            </div>
            <div className="updated-at">
              updated: <Moment format="LLL">{localUpdatedAt}</Moment>
            </div>
          </div>
          <div className="views">{item.views}</div>
          <div className="id">{item.id}</div>
        </Link>
      </div>
    );
  });

  return <div className="item-list">{itemList}</div>;
};

export default ProfileItemList;
