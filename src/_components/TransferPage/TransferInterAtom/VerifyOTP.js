import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class VerifyOTP extends Component {

    componentDidMount() {
        // this.props.getOtp();
    }
    render() {
        const onFinish = values => {
            this.props.sendOtp({ ...values })
            if (this.props.successOtpMsg)
                alert(this.props.successOtpMsg)
            // console.log('Success:', this.props.successOtpMsg);
            console.log("otp", this.props)
        };

        const onFinishFailed = errorInfo => {
            //  console.log('Failed:', errorInfo);
        };

        console.log(this.props.users);
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={(data) => this.props.onNext(data)}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item className="border-bottom border-light p-3"
                    label="Verify OTP"
                    extra="Time lefts: "
                    name="otp">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the OTP you got!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => this.props.getOtp()}>Reload OTP  </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        successOtpMsg: state.users.successOtpMsg,
        users: state.users
    };
}

const mapDispatchToProps = (dispatch) => ({
    getOtp: () => dispatch(userActions.getOtp()),
    sendOtp: (OtpMsg) => dispatch(userActions.sendOtp(OtpMsg))
});


const connectedVerifyOTP = connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);

export { connectedVerifyOTP as VerifyOTP }
