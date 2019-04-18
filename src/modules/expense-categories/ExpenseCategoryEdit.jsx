import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Divider } from 'antd';

import * as itemService from '../../services/ExpenseCategoryService';
import { notificationBox } from '../../_common/AppMessages.js';

const { TextArea } = Input;

class ExpenseCategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.loadData();
  }

  async loadData() {
    try {
      const id = this.props.match.params.id;
      const { data } = await itemService.findById(id, `select=name,category`);
      if (data.status === 200) {
        const { setFieldsValue } = this.props.form;
        const formData = {};
        delete data.d._id;
        Object.keys(data.d).forEach(key => {
          formData[key] = data.d[key];
        });
        setFieldsValue(formData);
      } else {
        notificationBox(data.message, 'error');
      }
    } catch (ex) {
      notificationBox(ex.message, 'error');
      console.log('ExpenseCategoryEdit:loadData:', ex);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      try {
        if (!err) {
          const id = this.props.match.params.id;
          if (!values.description) delete values.description;

          const { data } = await itemService.update(id, values);
          if (data.status === 200) {
            notificationBox('Item updated!', 'success');
            this.props.history.push('/expense-categories');
          } else if (data.status === 400) {
            const errors = {};
            Object.keys(data.errors).forEach(key => {
              errors[key] = {
                value: values[key],
                errors: [new Error(data.errors[key].join(','))]
              };
            });
            this.props.form.setFields(errors);
          } else {
            notificationBox(data.message, 'error');
            console.log(
              'ExpenseCategoryEdit:handleSubmit Response Failed:',
              data
            );
          }
        }
      } catch (ex) {
        notificationBox('An Exception has ocurred!', 'error');
        console.log('ExpenseCategoryEdit:handleSubmit', ex);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Row>
          <Col span={24}>
            <h2>Edit</h2>
            <h4>Expense Category</h4>
            <Link className='btn btn-link' to='/expense-categories'>
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
          <Form.Item label='Name'>
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

          <Form.Item label='Description'>
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
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Link
              className='ant-btn'
              style={{ marginLeft: 8 }}
              to='/expense-categories'
            >
              Cancel
            </Link>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

const WrappedForm = Form.create()(ExpenseCategoryEdit);

export default WrappedForm;
