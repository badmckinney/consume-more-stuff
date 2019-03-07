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
     
        <Link className="item-detail-container"to={`/items/${item.id}`}>
        
          <div className="item-detail">{item.status.name}</div>

          <div className="item-detail">{item.name}</div>

          <div className="item-detail">{item.category.name}</div>

            <div className="item-detail">
              <Moment format="LLL">{localCreatedAt}</Moment>
            </div>
            <div className="item-detail">
              updated: <Moment format="LLL">{localUpdatedAt}</Moment>
            </div>

          <div className="item-detail">{item.views}</div>

          <div className="item-detail">{item.id}</div>

        </Link>

        <div className="manage">
          <Link className="edit-link" to={`/items/${item.id}/edit`}>
            edit post
          </Link>
        </div>
      </div>
    );
  });

  return <div className="item-list">{itemList}</div>;
};

export default ProfileItemList;
