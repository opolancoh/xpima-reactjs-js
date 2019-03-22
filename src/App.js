import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import ExpenseCategoryList from './modules/expense-categories/ExpenseCategoryList';
import ExpenseCategoryCreate from './modules/expense-categories/ExpenseCategoryCreate';
import ExpenseCategoryDetail from './modules/expense-categories/ExpenseCategoryDetail';
import ExpenseCategoryDelete from './modules/expense-categories/ExpenseCategoryDelete';
import ExpenseCategoryEdit from './modules/expense-categories/ExpenseCategoryEdit';
import NotFound from './components/not-found';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main role="main" className="container">
          <Switch>
            <Route
              path="/expense-categories/create"
              component={ExpenseCategoryCreate}
            />
            <Route
              path="/expense-categories/detail/:id"
              component={ExpenseCategoryDetail}
            />
            <Route
              path="/expense-categories/delete/:id"
              component={ExpenseCategoryDelete}
            />
            <Route
              path="/expense-categories/edit/:id"
              component={ExpenseCategoryEdit}
            />
            <Route path="/expense-categories" component={ExpenseCategoryList} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/expense-categories" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
