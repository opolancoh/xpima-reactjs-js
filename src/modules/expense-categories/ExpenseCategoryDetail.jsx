import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Divider} from 'antd'

import ItemDetail from './ExpenseCategoryItem';
import * as itemService from '../../services/ExpenseCategoryService';

class ExpenseCategoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 0 };
  }

  async componentDidMount() {
    await this.loadData();
  }

  async loadData() {
    const id = this.props.match.params.id;
    //const result = await this.getData(id);
    const { data } = await itemService.findById(id);
    if (data.status === 200)
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
        <Link
          className="ant-btn"
          to={`/expense-categories/edit/${this.props.match.params.id}`}
        >
          Edit
        </Link>
      </React.Fragment>
    );
  }

  renderOnFailure() {
    return <h5>{this.state.message}</h5>;
  }

  render() {
    return (
      <React.Fragment>
        <h2>Detail</h2>
        <h4>Expense Category</h4>
        <Divider />
        {this.state.status === 1
          ? this.renderOnSuccess()
          : this.renderOnFailure()}
        <Link style={{ marginLeft: 8 }} to="/expense-categories">
          Back to List
        </Link>
      </React.Fragment>
    );
  }
}

export default ExpenseCategoryDetail;