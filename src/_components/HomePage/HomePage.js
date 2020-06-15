import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../_actions";

import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { TransferPage } from "../TransferPage";
import { MyAccountPage } from "../MyAccountPage/MyAccountPage";
import { BeneficiaryInforPage } from "../BeneficiaryInforPage/BeneficiaryInforPage";
import { DebtReminderPage } from "../DebtReminderPage/DebtReminderPage";
const { SubMenu } = Menu;

const comp = [
  {
    title: "Danh sach tai khoan",
    content: <MyAccountPage />,
  },
  {
    title: "Thong tin",
    content: <BeneficiaryInforPage />,
  },
  {
    title: "Thẻ",
    content: "Page 3",
  },
  {
    title: "Chuyển hàng nội địa",
    content: <TransferPage />,
  },
  {
    title: "Ngân hàng khác",
    content: "Page 3",
  },
  {
    title: "Danh sách nợ",
    content: <DebtReminderPage />,
  },
  {
    content: "Danh sách người nhận",
    content: "Page 3",
  },
  {
    title: "option 11",
    content: "Page 3",
  },
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      key: "1",
    };
  }
  componentDidMount() {
    const { userActions } = this.props;
    userActions();
    // let user = JSON.parse(localStorage.getItem('user'));
  }

  handleDeleteUser(id) {
    //return (e) => this.props.dispatch(userActions.delete(id));
    return null;
  }

  render() {
    const { user, users } = this.props;

    const toggleCollapsed = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
    const handleClick = (e) => {
      this.setState({
        key: e.key,
      });
    };
    return (
      <div className="row">
        <div className="col-2" style={{ backgroundColor: "#000c17" }}>
          <div style={{ width: 200 }}>
            <Button type="primary" onClick={toggleCollapsed}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
              )}
            </Button>
            <Menu
              defaultSelectedKeys={["0"]}
              defaultOpenKeys={["sub1", "sub2", "sub3"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
              onClick={handleClick}
            >
              <Menu.Item key="0" icon={<PieChartOutlined />}>
                Danh sách tài khoản
              </Menu.Item>
              <Menu.Item key="1" icon={<DesktopOutlined />}>
                Thông tin
              </Menu.Item>
              <Menu.Item key="2" icon={<ContainerOutlined />}>
                Thẻ
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="Chuyển tiền">
                <Menu.Item key="3">Ngân hàng nội địa</Menu.Item>
                <Menu.Item key="4">Ngân hàng khác</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Danh sách">
                <Menu.Item key="5">Danh sách nợ</Menu.Item>
                <Menu.Item key="6">Danh sách người nhận</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 11</Menu.Item>
                  <Menu.Item>
                    <LogoutOutlined /> <Link to="/login">Logout</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className="col-9 p-5">
          {" "}
          <h2> {comp[this.state.key].title}</h2>
          {users.error && (
            <span className="text-danger">ERROR: {users.error}</span>
          )}
          {comp[this.state.key].content}
        </div>
      </div>
    );
  }
}

// Không hiểu
function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

const mapDispatchToProps = (dispatch) => ({
  userActions: () => dispatch(userActions.getAll()), // GET - api/customer/
  getAccount: () => dispatch(userActions.getAccount()), // GET - api/customer/accounts
});

// this.props = customer's detail + customer's list accounts
const connectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export { connectedHomePage as HomePage };
