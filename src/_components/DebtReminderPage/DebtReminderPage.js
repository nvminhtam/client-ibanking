import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../_actions/user.actions";

import { Table } from "antd";

class DebtReminderPage extends Component {
  componentDidMount() {
    const { getDebtsList } = this.props;
    getDebtsList();
  }

  render() {
    const { debtList } = this.props; // array null

    // const creditors = debtList.creditors;
    // console.log(creditors);
    console.log("debtList", debtList);
    // const { creditors, payers } = debtList;
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
      <div>
        {/* <Table dataSource={creditors} columns={columns}></Table> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    debtList: state.users.debtList,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDebtsList: () => dispatch(userActions.getDebtsList()),
});

const connectedDebtReminderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtReminderPage);
export { connectedDebtReminderPage as DebtReminderPage };
