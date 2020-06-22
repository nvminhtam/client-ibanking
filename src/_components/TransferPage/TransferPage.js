import React, { Component } from 'react'
import { Steps, Button, message } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
// import BeneficiaryAccount from './TransferAtom/BeneficiaryAccount'
import { connect } from 'react-redux';
import { userActions } from '../../_actions/user.actions';

import { TransferInfo } from './TransferAtom/TransferInfo'
import { BeneficiaryAccount } from './TransferAtom/BeneficiaryAccount';
import { VerifyOTP } from './TransferAtom/VerifyOTP'
const { Step } = Steps;



const steps = [
    {
        title: 'First',
        content: (next) => <BeneficiaryAccount onNext={next} />,
    },
    {
        title: 'Second',
        content: (next) => <TransferInfo onNext={next} />,
    },
    {
        title: 'Last',
        content: (next) => <VerifyOTP onNext={next} />,
    },

];


class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            isDisabled: true,
            data: {
                depositor: "",
                receiver: "",

            }
        };
    }

    next(data) {
        console.log(data.receiver)

        if (this.state.current === 0) {
            if (data.isSaveBeneficiary)
                this.props.addBeneficiary({ beneficiary_account: data.receiver })
        }
        if (this.state.current == 2) {
            this.props.sendOtp(data)
            if (!this.props.users.error) {

                const transferInfor = {
                    depositor: this.state.data.depositor,
                    receiver: this.state.data.receiver,
                    amount: this.state.data.amount,
                    note: this.state.data.note,
                    charge_include: this.state.data.charge_include
                }
                this.props.transferIntrabank(transferInfor)
                if (!this.props.users.error)
                    message.success(this.props.users.error)
            }
        }
        else {
            const current = this.state.current + 1;
            this.setState({
                current
                , data: {
                    ...this.state.data,
                    ...data
                }
            });
        }

    }

    // prev() {
    //     const current = this.state.current - 1;
    //     this.setState({ current });
    // }

    render() {
        const { current } = this.state;
        // console.log(this.props.users);
        return (
            // <div>
            //     <BeneficiaryAccount />
            //     <TransferInfo />
            //     <VerifyOTP />
            // </div>
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                {/* {JSON.stringify(this.props.users)} */}
                {this.props.transferInforSuccess}
                <div className="steps-content">
                    <div className="p-5 border bg-white">
                        {steps[current].content((data) => this.next(data))}
                    </div>
                </div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>

            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        successOtpMsg: state.users.successOtpMsg,
        users: state.users,
        transferInforSuccess: state.users.transferInforSuccess
    };
}

const mapDispatchToProps = (dispatch) => ({
    sendOtp: (OtpMsg) => dispatch(userActions.sendOtp(OtpMsg)),
    transferIntrabank: (transferInfor) => dispatch(userActions.transferIntrabank(transferInfor)),
    addBeneficiary: (beneficiaryInfo) => dispatch(userActions.addBeneficiary(beneficiaryInfo)),
});


const connectedTransferPage = connect(mapStateToProps, mapDispatchToProps)(TransferPage);

export { connectedTransferPage as TransferPage }


