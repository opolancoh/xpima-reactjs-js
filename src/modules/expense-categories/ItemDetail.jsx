import React from 'react';
import PropTypes from 'prop-types';

const ItemDetail = props => {
  if (!props.data) return null;

  const keyClass = 'col-sm-2 text-right';
  const valueClass = 'col-sm-10';
  return (
    <React.Fragment>
      <dl className="row">
        <dt className={keyClass}>Id</dt>
        <dd className={valueClass}>{props.data._id}</dd>
        <dt className={keyClass}>Name</dt>
        <dd className={valueClass}>{props.data.name}</dd>
        <dt className={keyClass}>Description</dt>
        <dd className={valueClass}>{props.data.description}</dd>
        <dt className={keyClass}>Created At</dt>
        <dd className={valueClass}>{props.data.createdAt}</dd>
        <dt className={keyClass}>Updated At</dt>
        <dd className={valueClass}>{props.data.updatedAt}</dd>
      </dl>
    </React.Fragment>
  );
};

ItemDetail.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};

export default ItemDetail;
