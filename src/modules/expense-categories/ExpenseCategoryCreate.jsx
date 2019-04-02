import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Divider } from 'antd';

import * as itemService from '../../services/ExpenseCategoryService';
import { notificationBox } from '../../_common/AppMessages.js';

const { TextArea } = Input;

class ExpenseCategoryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      try {
        if (!err) {
          const { data } = await itemService.create(values);

          if (data.status === 'success') {
            this.props.history.push('/expense-categories');
          } else {
            if (data.code === 400) {
              const errors = {};
              Object.keys(data.errors).forEach(key => {
                errors[key] = {
                  value: values[key],
                  errors: [new Error(data.errors[key].join(','))]
                };
              });
              this.props.form.setFields(errors);
            } else {
              console.log(
                'ExpenseCategoryEdit:handleSubmit Response Failed:',
                data
              );
              notificationBox(data.message, 'error');
            }
          }
        }
      } catch (ex) {
        console.log('ExpenseCategoryCreate:handleSubmit', ex);
        notificationBox('An Exception has ocurred!', 'error');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Row>
          <Col span={24}>
            <h2>Create</h2>
            <h4>Expense Category</h4>
            <Link className="btn btn-link" to="/expense-categories">
              Back to List
            </Link>
            <Divider />
          </Col>
        </Row>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'This field is required.' },
                {
                  max: 30,
                  message:
                    'Length must be less than or equal to 30 characters long.'
                }
              ]
            })(<Input autoFocus />)}
          </Form.Item>

          <Form.Item label="Description">
            {getFieldDecorator('description', {
              rules: [
                {
                  max: 255,
                  message:
                    'Length must be less than or equal to 255 characters long.'
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link
              className="ant-btn"
              style={{ marginLeft: 8 }}
              to="/expense-categories"
            >
              Cancel
            </Link>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

const WrappedForm = Form.create()(ExpenseCategoryCreate);

export default WrappedForm;
