import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';

import * as itemService from '../../services/ExpenseCategoryService';

class ExpenseCategoryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      formData: {
        name: '',
        description: ''
      },
      errors: {}
    };
  }

  schema = {
    name: Joi.string()
      .trim()
      .max(30)
      .required()
      .label('Name'),
    description: Joi.string()
      .trim()
      .allow('')
      .max(255)
      .label('Description')
  };

  async componentDidMount() {
    await this.loadData();
  }

  async loadData() {
    const id = this.props.match.params.id;
    const { data } = await itemService.findById(id, `select=name,category`);
    if (data.code === 200)
      this.setState({
        status: 1,
        formData: data.d
      });
    else {
      this.setState({
        status: 2,
        message: data.message
      });
    }
  }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const formData = { ...this.state.formData };
    delete formData._id;
    if (formData.description === '') delete formData.description;

    const validationResult = this.handleValidate(formData);
    this.setState({ errors: validationResult || {} });
    if (validationResult) return;

    try {
      const id = this.props.match.params.id;
      const { data } = await itemService.update(id, formData);
      if (data.code === 200) {
        this.props.history.push('/expense-categories');
      } else if (data.code === 400) {
        const errors = {};
        data.errors.forEach(item => {
          errors[item.field] = item.message;
        });
        this.setState({ errors });
      } else if (data.code === 500) {
        console.log('error', data);
      }
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  handleValidate = data => {
    const result = Joi.validate(data, this.schema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    result.error.details.forEach(item => {
      errors[item.path] = item.message;
    });

    return errors;
  };

  render() {
    if (this.state.status === 0) return null;

    const { formData, errors } = this.state;
    return (
      <React.Fragment>
        <h2>Edit</h2>
        <h4>Expense Category</h4>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className={
                    errors.name ? 'form-control is-invalid' : 'form-control'
                  }
                  id="name"
                  name="name"
                  autoFocus
                  value={formData.name}
                  onChange={this.handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className={
                    errors.description
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  id="description"
                  name="description"
                  rows="2"
                  value={formData.description}
                  onChange={this.handleChange}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
              <Link className="btn btn-link" to="/expense-categories">
                Back to List
              </Link>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExpenseCategoryCreate;
