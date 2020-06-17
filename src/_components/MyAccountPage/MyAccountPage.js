import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../_actions/user.actions';

const accountsInfor = (accountOwner = []) => (
    accountOwner.map((acc, i) =>
        <div key={i} className="container ml-5">
            <div><b>So tai khoan:</b>  {acc.account_number}</div>
            <div><b>So du hien tai:</b> {acc.account_balance} VND</div>
            <div><b>Loai tai khoan:</b> {acc.type === 1 ? <span>Thanh toan</span> : <span>Tiet kiem</span>}</div>
            <br />
        </div>
    )
)
class MyAccountPage extends Component {


    componentDidMount() {
        const { getAccount } = this.props
        getAccount();
    }

    render() {
        const { accountOwner } = this.props
        return (
            <div className="container shadow-lg p-3 mb-5 bg-white rounded ">
                <hr />
                {/* {JSON.stringify(accountOwner)} */}

                <div className="mt-5">
                    {/* <h3>Tai khoan thanh toan</h3>
                    <div className="container">
                        <div>So tai khoan:</div>
                        <div>So du hien tai: </div>
                    </div> */}
                    {accountsInfor(accountOwner)}
                </div>
                <div className="mt-5">
                    {/* <h3>Tai khoan tiet kiem</h3>
                    <div className="container">
                        <div>So tai khoan:</div>
                        <div>So du hien tai: </div>
                    </div> */}
                    {/* {accountsInfor(accountOwner, false)} */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        accountOwner: state.users.accountOwner,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getAccount: () => dispatch(userActions.getAccount()),
});

const connectedMyAccountPage = connect(mapStateToProps, mapDispatchToProps)(MyAccountPage);
export { connectedMyAccountPage as MyAccountPage }