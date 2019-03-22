import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination';
import * as itemService from '../../services/ExpenseCategoryService';

class ExpenseCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      data: [],
      pageSize: 5,
      currentPage: 1,
      sortColumn: { id: 'name', asc: true }
    };
  }

  async componentDidMount() {
    await this.loadData();
  }

  handlePageChange = async page => {
    await this.loadData(page);
  };

  async handleSort(e) {
    e.persist();
    const { sortColumn } = this.state;
    const newSortColumn = { id: e.target.id };

    if (sortColumn.id === e.target.id) newSortColumn.asc = !sortColumn.asc;
    else newSortColumn.asc = true;

    await this.loadData(this.state.currentPage, newSortColumn);
  }

  async loadData(
    currentPage = this.state.currentPage,
    sortColumn = this.state.sortColumn
  ) {
    const { pageSize } = this.state;
    const offset = (currentPage - 1) * pageSize;
    const sortAggregation = this.getSortAggregation(sortColumn);

    const { data } = await itemService.find(
      `offset=${offset}&limit=${pageSize}&sort=${sortAggregation}`
    );
    if (data.code === 200)
      this.setState({
        status: 1,
        data: data.d,
        currentPage,
        pageSize,
        totalCount: data._meta.totalCount,
        sortColumn
      });
    else
      this.setState({
        status: 2,
        errorMessage: data.message
      });
  }

  getSortAggregation = column => {
    return column.asc ? column.id : '-' + column.id;
  };

  renderSortIcon = columnId => {
    const { sortColumn } = this.state;

    if (columnId !== sortColumn.id) return null;
    if (sortColumn.asc) return <i className="fas fa-angle-up" />;
    return <i className="fas fa-angle-down" />;
  };

  renderTableMessage = message => {
    return (
      <tr>
        <td className="text-center" colSpan={4}>
          {message}
        </td>
      </tr>
    );
  };

  renderTableHead = message => {
    return (
      <thead>
        <tr>
          <th scope="col">
            <span
              id="name"
              className="pointer"
              onClick={e => {
                this.handleSort(e);
              }}
            >
              Name {this.renderSortIcon('name')}
            </span>
          </th>
          <th scope="col">
            <span
              id="description"
              className="pointer"
              onClick={e => {
                this.handleSort(e);
              }}
            >
              Description {this.renderSortIcon('description')}
            </span>
          </th>
          <th scope="col">
            <span
              id="updatedAt"
              className="pointer"
              onClick={e => {
                this.handleSort(e);
              }}
            >
              Updated {this.renderSortIcon('updatedAt')}
            </span>
          </th>
          <th />
        </tr>
      </thead>
    );
  };

  renderTableItems = () => {
    return this.state.data.map(item => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.updatedAt}</td>
        <td>
          <Link to={`/expense-categories/edit/${item._id}`}>Edit</Link> |
          <Link to={`/expense-categories/detail/${item._id}`}> Detail</Link> |
          <Link to={`/expense-categories/delete/${item._id}`}> Delete</Link>
        </td>
      </tr>
    ));
  };

  render() {
    if (this.state.status === 0) return null;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-8">
            <h2>Expense Categories</h2>
          </div>
          <div className="col-4">
            <div className="row justify-content-end">
              <Link
                className="btn btn-sm btn-primary"
                to="/expense-categories/create"
              >
                Create New
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              {this.renderTableHead()}
              <tbody>
                {this.state.status === 1
                  ? this.state.totalCount === 0
                    ? this.renderTableMessage('No matching records found')
                    : this.renderTableItems()
                  : this.state.status === 2
                  ? this.renderTableMessage(this.state.errorMessage)
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.status === 1 ? (
          <Pagination
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            totalCount={this.state.totalCount}
            onPageChange={this.handlePageChange}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default ExpenseCategoryList;
