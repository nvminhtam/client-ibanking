import React, { useState } from 'react';
import {
    Form,
    Input,
    Radio,
    Select,
    Button,
} from 'antd'
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';


const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const TransferInfo = (props) => {
    const [form] = Form.useForm();
    const [charge, setCharge] = useState(0);

    const onFinish = values => {
        const transferAccountInfo = JSON.parse(localStorage.getItem('transferAccountInfo'))

        if (transferAccountInfo) {
            const { transferIntrabank } = props
            const transferInfo = {
                ...transferAccountInfo,
                ...values
            }
            console.log(transferInfo)

            transferIntrabank(transferInfo);
        }
        //     console.log(localStorage.getItem('transferAccountInfo'))
        // console.log('Received values of form: ', values);
    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }

    const onChangeRadio = e => {
        setCharge(e.target.value)
    }

    const prefixSelector = (
        <Form.Item noStyle>
            <Select
                style={{
                    width: 100,
                }}
            >
                <Option value="VND">VND</Option>
                <Option value="USA">$</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: 'VND',
            }}
            scrollToFirstError
        >
            <Form.Item className="border-bottom border-light p-3"
                name="amount"
                label="Payment amount"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Payment amount!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item label="Your note"
                className="border-bottom border-light p-3"
                name="note">
                <TextArea
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
            </Form.Item>

            <Form.Item onChange={onChangeRadio} label="Charges " className="border-bottom border-light p-3" name="charge_include"
                rules={[
                    {
                        required: true,
                        message: 'Please input charge!',
                    },
                ]}>
                <Radio.Group value={charge}>
                    <Radio style={radioStyle} value={0}>
                        All charges to my account
        </Radio>
                    <Radio style={radioStyle} value={1}>
                        All charges to beneficiary's account
        </Radio>
                </Radio.Group>
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Accept Tranfer
        </Button>
            </Form.Item>
        </Form>
    );
};


function mapStateToProps(state) {
    return {
        transferInforSuccess: state.users.transferInforSuccess,
        transferError: state.users.transferError
    };
}

const mapDispatchToProps = (dispatch) => ({
    transferIntrabank: (transferInfor) => dispatch(userActions.transferIntrabank(transferInfor)),
    // getBeneficiaryAccount: (accNumber) => dispatch(userActions.getBeneficiaryAccount(accNumber)),
    // getListBeneficiaryAccount: () => dispatch(userActions.getBeneficiaryAccounts()),
});


const connectedTransferInfo = connect(mapStateToProps, mapDispatchToProps)(TransferInfo);

export { connectedTransferInfo as TransferInfo }

