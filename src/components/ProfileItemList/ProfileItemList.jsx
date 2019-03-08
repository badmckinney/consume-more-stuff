import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './ProfileItemList.scss';

const ProfileItemList = props => {
  const { toggleStatus } = props;

  const makeStatusButton = (status_id, id) => {
    if (status_id !== 1) {
      return (
        <div className="change-status">
          <button
            className="btn"
            onClick={toggleStatus}
            data-id={id}
            data-status={status_id}
          >
            re-publish posting
          </button>
        </div>
      );
    } else {
      return (
        <div className="change-status">
          <button
            className="btn"
            onClick={toggleStatus}
            data-id={id}
            data-status={status_id}
          >
            mark as sold
          </button>
        </div>
      );
    }
  };

  const itemList = props.items.map(item => {
    const localCreatedAt = new Date(item.created_at);
    const localUpdatedAt = new Date(item.updated_at);

    return (
      <div className="item" key={item.id}>
        <Link className="item-detail-container" to={`/items/${item.id}`}>
          <div className="item-columns">
            <div className="item-status">{item.status.name}</div>
          </div>
        </Link>

        <div className="item-columns manage">
          <Link className="item-detail-container" to={`/items/${item.id}`}>
            <div className="item-display">
              <button className="btn">Display</button>
            </div>
          </Link>
          <Link className="item-detail-container" to={`/items/${item.id}/edit`}>
            <div className="item-edit">
              <button className="btn">Edit</button>
            </div>
          </Link>
          {makeStatusButton(item.status_id, item.id)}
        </div>

        <Link className="item-detail-container" to={`/items/${item.id}`}>
          <div className="item-columns">
            <div className="item-name">{item.name}</div>
          </div>
          <div className="item-columns">
            <div className="item-category">{item.category.name}</div>
          </div>
          <div className="item-columns">
            <div className="item-date">
              <Moment format="LLL">{localCreatedAt}</Moment>
            </div>
          </div>
          <div className="item-columns">
            <div className="item-updated-date">
              <Moment format="LLL">{localUpdatedAt}</Moment>
            </div>
          </div>
          <div className="item-columns">
            <div className="item-views">{item.views}</div>
          </div>
          <div className="item-columns">
            <div className="item-id">{item.id}</div>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="item-list">{itemList}</div>;
};

export default ProfileItemList;
