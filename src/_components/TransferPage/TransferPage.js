import React, { Component } from 'react'
import { Steps, Button, message } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
// import BeneficiaryAccount from './TransferAtom/BeneficiaryAccount'
import { TransferInfo } from './TransferAtom/TransferInfo'
import { BeneficiaryAccount } from './TransferAtom/BeneficiaryAccount';
import { VerifyOTP } from './TransferAtom/VerifyOTP'
const { Step } = Steps;


const steps = [
    {
        title: 'First',
        content: <BeneficiaryAccount />,
    },
    {
        title: 'Second',
        content: <TransferInfo />,
    },
    {
        title: 'Last',
        content: <VerifyOTP />,
    },
];


class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;
        return (
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="steps-content">
                    <div className="p-5 border bg-white">
                        {steps[current].content}
                    </div>
                </div>
                <div className="steps-action p-3">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
            </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
            </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            Previous
            </Button>
                    )}
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

export { TransferPage }

