import React from 'react';
import PropTypes from 'prop-types';

const ItemDetail = props => {
  if (!props.data) return null;

  const dlStyle = {
    fontSize: '1rem'
  };
  const dtStyle = {
    fontWeight: 'bold'
  };
  const ddStyle = {
    fontSize: '.9rem',
    marginLeft: '15px'
  };

  return (
    <React.Fragment>
      <dl style={dlStyle}>
        <dt style={dtStyle}>Id</dt>
        <dd style={ddStyle}>{props.data._id}</dd>
        <dt style={dtStyle}>Name</dt>
        <dd style={ddStyle}>{props.data.name}</dd>
        <dt style={dtStyle}>Description</dt>
        <dd style={ddStyle}>{props.data.description}</dd>
        <dt style={dtStyle}>Created At</dt>
        <dd style={ddStyle}>{props.data.createdAt}</dd>
        <dt style={dtStyle}>Updated At</dt>
        <dd style={ddStyle}>{props.data.updatedAt}</dd>
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
