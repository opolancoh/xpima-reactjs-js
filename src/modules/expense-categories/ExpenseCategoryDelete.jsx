import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';

import ItemDetail from './ExpenseCategoryItem';
import * as itemService from '../../services/ExpenseCategoryService';
import { notificationBox } from '../../_common/AppMessages.js';

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
        <Button type="primary" onClick={this.handleRemove}>
          Delete
        </Button>
      </React.Fragment>
    );
  }

  renderOnFailure() {
    return <h5>{this.state.message}</h5>;
  }

  handleRemove = async e => {
    e.preventDefault();

    try {
      const id = this.props.match.params.id;
      const { data } = await itemService.remove(id);
      if (data.status === 200) {
        notificationBox('Item deleted!', 'success');
        this.props.history.push('/expense-categories');
      } else {
        console.log(
          'ExpenseCategoryDelete:handleRemove Response Failed:',
          data
        );
        notificationBox(data.message, 'error');
      }
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h2>Detail</h2>
        <h4>Expense Category</h4>
        <h5>Are you sure you want to delete this?</h5>
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
