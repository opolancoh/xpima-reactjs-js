import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Icon, Divider, Row, Col } from 'antd';

import * as itemService from '../../services/ExpenseCategoryService';
import { notificationBox } from '../../_common/AppMessages.js';

class ExpenseCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: {
        order: 'ascend',
        columnKey: 'name'
      },
      paginationInfo: {
        pageSize: 5,
        current: 1,
        totalCount: 0
      },
      data: []
    };
    this.selectAgregation = 'name,description,updatedAt';
  }

  async componentDidMount() {
    await this.loadData();
  }

  /* Event Handlers */
  handleChange = async (pagination, filters, sorter) => {
    //console.log('Event parameters', pagination, filters, sorter);

    let { paginationInfo, filteredInfo, sortedInfo } = this.state;
    if (pagination) {
      paginationInfo = {
        pageSize: pagination.pageSize,
        current: pagination.current,
        totalCount: pagination.totalCount
      };
    }

    if (sorter) {
      if (Object.keys(sorter).length > 0) sortedInfo = sorter;
      else {
        console.log('aqui');
        sortedInfo.order = sortedInfo.order === 'ascend' ? 'descend' : 'ascend';
      }
    }

    if (filters) {
      filteredInfo = filters;
    }

    await this.loadData(paginationInfo, filteredInfo, sortedInfo);
  };
  //
  clearAll = async () => {
    let { paginationInfo, filteredInfo, sortedInfo } = this.state;
    filteredInfo = null;
    sortedInfo = {
      order: 'ascend',
      columnKey: 'name'
    };
    await this.loadData(paginationInfo, filteredInfo, sortedInfo);
  };
  //
  handleSearch = async (selectedKeys, confirm) => {
    confirm();
  };
  //
  handleReset = async clearFilters => {
    clearFilters();
  };
  //

  /* Table Operations*/
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });
  //
  getSortAggregation = sortedInfo => {
    return sortedInfo.order === 'ascend'
      ? sortedInfo.columnKey
      : '-' + sortedInfo.columnKey;
  };
  //
  getFilterAggregation = filteredInfo => {
    let filterAggregation = '';
    if (filteredInfo) {
      const validFilters = {};
      Object.keys(filteredInfo).forEach(key => {
        if (filteredInfo[key].length > 0) {
          validFilters[key] = filteredInfo[key];
        }
      });
      const length = Object.keys(validFilters).length - 1;
      Object.keys(validFilters).forEach((key, index) => {
        filterAggregation += `${key}:${validFilters[key]}`;
        if (index < length) filterAggregation += '|';
      });
    }
    return filterAggregation;
  };

  /* API Operations */
  async loadData(
    paginationInfo = this.state.paginationInfo,
    filteredInfo = this.state.filteredInfo,
    sortedInfo = this.state.sortedInfo
  ) {
    //console.log('Various parameters', paginationInfo, filteredInfo, sortedInfo);
    const offset = (paginationInfo.current - 1) * paginationInfo.pageSize;
    const sortAggregation = this.getSortAggregation(sortedInfo);

    let queryString = `offset=${offset}&limit=${
      paginationInfo.pageSize
    }&sort=${sortAggregation}&select=${this.selectAgregation}`;

    const filterAggregation = this.getFilterAggregation(filteredInfo);
    if (filterAggregation) queryString += `&search=${filterAggregation}`;

    console.log('queryString', queryString);

    const { data } = await itemService.find(queryString);
    if (data.code === 200) {
      console.log(data.d);
      const d = data.d.map(item => {
        return {
          key: item._id,
          name: item.name,
          description: item.description,
          updatedAt: item.updatedAt
        };
      });
      this.setState({
        filteredInfo,
        paginationInfo: {
          ...paginationInfo,
          totalCount: data._meta.totalCount
        },
        sortedInfo,
        data: d
      });
    } else {
      notificationBox(data.message, 'error');
      console.log('ExpenseCategoryList:loadData:', data.message);
    }
  }

  render() {
    //console.log('this.state', this.state);
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        render: (text, record) => (
          <Link to={`/expense-categories/detail/${record.key}`}>{text}</Link>
        ),
        ...this.getColumnSearchProps('name')
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        ...this.getColumnSearchProps('description')
      },
      {
        title: 'Updated',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'updatedAt' && sortedInfo.order
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/expense-categories/edit/${record.key}`}>Edit</Link>
            <Divider type="vertical" />
            <Link to={`/expense-categories/delete/${record.key}`}>Delete</Link>
          </span>
        )
      }
    ];

    return (
      <Fragment>
        <Row>
          <Col span={8}>
            <h2>Expense Categories</h2>
          </Col>
          <Col span={8} offset={8}>
            <Link
              className="ant-btn ant-btn-primary"
              to="/expense-categories/create"
              style={{ marginBottom: 16, float: 'right' }}
            >
              Create New
            </Link>
            {/*<Button onClick={this.clearAll} style={{ marginBottom: 16, float: 'right' }}>Clear filters and sorters</Button>*/}
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={this.state.data}
          onChange={this.handleChange}
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: ['5', '10', '30', '50'],
            showSizeChanger: true,
            total: this.state.paginationInfo.totalCount,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </Fragment>
    );
  }
}

export default ExpenseCategoryList;
