import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ItemDetail from './ItemDetail';
import * as itemService from '../../services/ExpenseCategoryService';

class ExpenseCategoryDelete extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 0 };
  }

  async componentDidMount() {
    await this.loadData();
  }

  async handleRemove(e) {
    e.preventDefault();

    try {
      const id = this.props.match.params.id;
      const { data } = await itemService.remove(id);
      if (data.status === 'success') {
        this.props.history.push('/expense-categories');
      } else if (data.status === 'failure') {
        /*const errors = {};
        data.errors.forEach(item => {
          errors[item.field] = item.message;
        });
        this.setState({ errors });*/
      } else if (data.status === 'error') {
        console.log('error', data);
      }
    } catch (ex) {
      console.log('ex', ex);
    }
  }

  async loadData() {
    const id = this.props.match.params.id;
    //const result = await this.getData(id);
    const { data } = await itemService.findById(id);
    if (data.code === 200)
      this.setState({
        status: 1,
        data: data.d
      });
    else {
      this.setState({
        status: 2,
        message: data.message
      });
    }
  }

  renderOnSuccess() {
    return (
      <React.Fragment>
        <ItemDetail data={this.state.data} />
        <button className="btn btn-primary" onClick={(e) => this.handleRemove(e)}>
          Delete
        </button>
      </React.Fragment>
    );
  }

  renderOnFailure() {
    return <h5>{this.state.message}</h5>;
  }

  render() {
    return (
      <React.Fragment>
        <h2>Delete</h2>
        <h4>Expense Category</h4>
        <h5>Are you sure you want to delete this?</h5>
        <hr />
        {this.state.status === 1
          ? this.renderOnSuccess()
          : this.renderOnFailure()}
        <Link className="btn btn-link" to="/expense-categories">
          Back to List
        </Link>
      </React.Fragment>
    );
  }
}

export default ExpenseCategoryDelete;
