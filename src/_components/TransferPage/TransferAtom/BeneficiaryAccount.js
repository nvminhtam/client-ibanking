import React, { Component } from 'react'
import { Form, AutoComplete, Input, Button, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';


const { Panel } = Collapse;


const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const accountInfo = (info = {}) => (
    <div>
        <p><b>Beneficiary's Name: </b> {info.fullname}</p>
        <p><b>Account Number    : </b>{info.account_number}</p>
    </div>
);

const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                <UserOutlined /> {count}
            </span>
        </div>
    ),
});

const options = (values = []) => [
    {
        //  ((acc, i) => <Option value={acc.account_number} key={i}>{acc.account_number}</Option>)
        // label: renderTitle('Libraries'),;
        options: values.map((value, i) => renderItem(value.beneficiary_account, value.beneficiary_name)),
    },

    // {
    //     // label: renderTitle('Solutions'),
    //     options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    // },
    // {
    //     label: renderTitle('Articles'),
    //     options: [renderItem('AntDesign design language', 100000)],
    // },
];


const accounts = (account = []) => (
    account.map((acc, i) => <Option value={acc.account_number} key={i}>{acc.account_number}</Option>)
)

//end
//---------------------------------------------------//


class Beneficiary extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { getAccount, getListBeneficiaryAccount } = this.props
        getAccount();
        getListBeneficiaryAccount();
    }


    render() {
        const onFinish = values => {
            console.log('Success:', values);

            const { getBeneficiaryAccount } = this.props
            getBeneficiaryAccount({ account_number: values.BeneficiaryAccount });
            const { accountBeneficiary, listAccountBeneficiary } = this.props
            this.setState({
                accountOwner: values.ownerAccount,
                accountBeneficiary,
                listAccountBeneficiary
            })
            console.log(this.state)
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };


        const { accountOwner, accountBeneficiary, listAccountBeneficiary } = this.props

        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Your account" className="border-bottom border-light p-3"
                        name="ownerAccount">
                        <Select
                            placeholder="Select your account"
                        >
                            {/* <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option> */}
                            {/* {
                                account.map((acc, i) => <Option value={acc.account_number} key={i}>{acc.customer_username}</Option>)
                            } */}
                            {accounts(accountOwner)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Beneficiary" className="border-bottom border-light p-3"
                        name="BeneficiaryAccount">
                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            options={options(listAccountBeneficiary)}
                        >
                            <Input.Search size="large" placeholder="input here" />
                        </AutoComplete>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Access Beneficiary
                </Button>
                    </Form.Item>

                </Form>

                {/* --------------------------- */}
                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="site-collapse-custom-collapse bg-light"
                >
                    <Panel header="Beneficiary's Information" key="1" className="site-collapse-custom-panel">
                        {accountInfo(accountBeneficiary)}
                    </Panel>
                </Collapse>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        accountOwner: state.users.accountOwner,
        accountBeneficiary: state.users.accountBeneficiary,
        listAccountBeneficiary: state.users.accountBeneficiarys
    };
}

const mapDispatchToProps = (dispatch) => ({
    getAccount: () => dispatch(userActions.getAccount()),
    getBeneficiaryAccount: (accNumber) => dispatch(userActions.getBeneficiaryAccount(accNumber)),
    getListBeneficiaryAccount: () => dispatch(userActions.getBeneficiaryAccounts()),
});


const BeneficiaryAccount = connect(mapStateToProps, mapDispatchToProps)(Beneficiary);

export { BeneficiaryAccount }
