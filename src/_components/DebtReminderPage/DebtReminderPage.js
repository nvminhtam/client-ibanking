import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../_actions/user.actions";

import { Table } from "antd";

class DebtReminderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debtList: null,
      isloaded: false,
    };
  }

  componentDidMount() {
    // const { getAccount } = this.props;
    // getAccount();

    const { getDebtList } = this.props;
    getDebtList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.debtList &&
      nextProps.debtList !== prevState.debtList &&
      !prevState.isloaded
      ? {
          ...prevState,
          debtList: nextProps.debtList,
          isloaded: true,
        }
      : {
          ...prevState,
        };
  }
  render() {
    const { debtList } = this.state; // array

    // const creditors = debtList.creditors;
    // console.log(creditors);
    console.log('debtList', debtList);
    // const { creditors, payers } = debtList;
    // console.log(getDebtList);
    // const { payers } = this.props; // array

    // const dataSource = [
    //   {
    //     key: "1",
    //     name: "Mike",
    //     age: 32,
    //     address: "10 Downing Street",
    //   },
    //   {
    //     key: "2",
    //     name: "John",
    //     age: 42,
    //     address: "10 Downing Street",
    //   },
    // ];

    // const creditors = [
    //   {
    //     id: 5,
    //     creditor: "69324",
    //     payer: "28349",
    //     amount: 10000,
    //     paid: 0,
    //     description: "trả tiền tao",
    //   },
    //   {
    //     id: 5,
    //     creditor: "69324",
    //     payer: "28349",
    //     amount: 10000,
    //     paid: 0,
    //     description: "trả tiền tao",
    //   },
    // ];
    const columns = [
      {
        title: "Chủ nợ",
        dataIndex: "creditor",
        key: "creditor",
      },
      {
        title: "Người mượn nợ",
        dataIndex: "payer",
        key: "payer",
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Thanh toán",
        dataIndex: "paid",
        key: "paid",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
      },
    ];

    return (
      <div>{/* <Table dataSource={creditors} columns={columns} /> */}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    debtList: state.users.debtList,
    success: state.users.success,
    addError: state.users.addError,
    // accountOwner: state.users.accountOwner,
  };
}

const mapDispatchToProps = (dispatch) => ({
  // getAccount: () => dispatch(userActions.getAccount()),
  getDebtList: () => dispatch(userActions.getDebtsList()),
});

const connectedDebtReminderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtReminderPage);
export { connectedDebtReminderPage as DebtReminderPage };
