import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../_actions/user.actions";

import { Table, Button, Tag } from "antd";

class CreateDebtPage extends Component {
  componentDidMount() {
    const { getDebtsList } = this.props;
    getDebtsList();
  }

  render() {
    const { debtList } = this.props; // array null

    // const creditors = debtList.creditors;
    // console.log(creditors);
    console.log("debtList", debtList);
    if (!debtList) {
      return <div></div>;
    }
    const { creditors, payers } = debtList;
    const visible_debt = [...payers].filter(debt => debt.visibleToPayer == 1)
    const list = [...creditors, ...visible_debt]
    console.log(creditors);
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
        render: paid => {
          let color = paid === 0 ? 'red' : 'green';
          let text = (paid === 0 ? 'chưa thanh toán' : 'đã thanh toán');
          return (
            <Tag color={color} key={paid}>
              {text.toUpperCase()}
            </Tag>
          );
        }
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
      },
      {
        title:"Thao tác",
        key: "action",
        render: ()=>(
          <Button danger>XÓA</Button>
        )
      }
    ];

    return (
      <div>
        <Button type="primary" id="add_debtRemind">Tạo nhắc nợ</Button>
        <Table dataSource={list} columns={columns}></Table>

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

const connectedCreateDebtPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDebtPage);
export { connectedCreateDebtPage as CreateDebtPage };