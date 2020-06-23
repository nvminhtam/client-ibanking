import React from 'react'
import { Steps } from 'antd';

import BeneficiaryAccount from "./transferPageAtom/BeneficiaryAccount";
const { Step } = Steps;

const TransferPage = () => {
    return (
        <div>
            <BeneficiaryAccount />
            <Steps size="small" current={1}>
                <Step title="Finished" />
                <Step title="In Progress" />
                <Step title="Waiting" />
            </Steps>
        </div>
    )
}

export default TransferPage;