import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ currentPage, pageSize, totalCount, onPageChange }) => {
  if (totalCount === 0) return null;

  const pageCount = Math.ceil(totalCount / pageSize);
  //if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <div className="row">
      <div className="col">
        <div>
          View {(currentPage - 1) * pageSize + 1}-
          {currentPage === pages[pages.length - 1]
            ? totalCount
            : currentPage * pageSize}{' '}
          of {totalCount}
        </div>
      </div>
      {pages.length > 1 ? (
        <div className="col">
          <nav aria-label="Page navigation">
            <ul className="pagination  justify-content-end">
              <li
                className={
                  currentPage === 1 ? 'page-item disabled' : 'page-item'
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>
              {pages.map(page => (
                <li
                  key={page}
                  className={
                    page === currentPage ? 'page-item active' : 'page-item'
                  }
                >
                  <button
                    className="page-link"
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={
                  currentPage === pages[pages.length - 1]
                    ? 'page-item disabled'
                    : 'page-item'
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
