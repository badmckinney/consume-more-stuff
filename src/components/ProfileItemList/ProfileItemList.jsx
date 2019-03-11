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
            Re-publish
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
            Mark as sold
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
        <div className="status-column">{item.status.name}</div>
        <div className="manage-column">
          <Link className="item-detail-container" to={`/items/${item.id}`}>
            <button className="btn">View</button>
          </Link>
          <Link className="item-detail-container" to={`/items/${item.id}/edit`}>
            <button className="btn">Edit</button>
          </Link>
          {makeStatusButton(item.status_id, item.id)}
        </div>
        <div className="title-column">{item.name}</div>
        <div className="category-column">{item.category.name}</div>
        <div className="date-column">
          <Moment format="LLL">{localCreatedAt}</Moment>
        </div>
        <div className="update-column">
          <Moment format="LLL">{localUpdatedAt}</Moment>
        </div>
        <div className="views-column">{item.views}</div>
        <div className="id-column">{item.id}</div>

      </div>
    );
  });

  return <>{itemList}</>;
};

export default ProfileItemList;
