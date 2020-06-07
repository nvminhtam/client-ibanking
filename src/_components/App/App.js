import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { PrivateRoute } from '..';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { TransferPage } from '../TransferPage'

class App extends React.Component {
    constructor(props) {
        super(props);

        // const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
            this.props.alertActions;
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div >
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div >
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute path="/transfer" component={TransferPage} />

                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </div>
                </Router>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const mapDispatchToProps = (dispatch) => ({
    alertActions: () => dispatch(alertActions.clear())
});

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App }; 