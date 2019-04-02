import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Redirect, Switch, Link } from 'react-router-dom';

import ExpenseCategoryList from './modules/expense-categories/ExpenseCategoryList';
import ExpenseCategoryCreate from './modules/expense-categories/ExpenseCategoryCreate';
import ExpenseCategoryDetail from './modules/expense-categories/ExpenseCategoryDetail';
import ExpenseCategoryDelete from './modules/expense-categories/ExpenseCategoryDelete';
import ExpenseCategoryEdit from './modules/expense-categories/ExpenseCategoryEdit';
import NotFound from './components/not-found';

//import logo from './logo.svg';
import './App.css';

const { Header, Sider, Content, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="bars" />
              <span>Expense Categories</span>
              <Link to="/" />
            </Menu.Item>
            {/*<Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
    </Menu.Item>*/}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
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
              <Route
                path="/expense-categories"
                component={ExpenseCategoryList}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/expense-categories" />
              <Redirect to="/not-found" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>{`XPIMA ©2019`}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
