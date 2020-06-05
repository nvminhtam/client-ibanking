import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import './styles.css'
class HomePage extends React.Component {
    componentDidMount() {
        this.props.userActions
    }

    handleDeleteUser(id) {
        //return (e) => this.props.dispatch(userActions.delete(id));
        return null;
    }

    render() {
        const { user, users } = this.props;
        return (
            // <div className="col-md-6 col-md-offset-3">
            //     <h1>Hi {user.fullname}!</h1>
            //     <p>this is LKN Banking</p>
            //     {users.loading && <em>Loading users...</em>}
            //     {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            //     {users.items &&
            //         <ul>
            //             {users.items.map((user, index) =>
            //                 <li key={user.username}>
            //                     {user.username + ' ' + user.fullname}
            //                     {
            //                         user.deleting ? <em> - Deleting...</em>
            //                             : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
            //                                 : <span> - <a onClick={this.handleDeleteUser(user.username)}>Delete</a></span>
            //                     }
            //                 </li>
            //             )}
            //         </ul>
            //     }
            //     <p>
            //         <Link to="/login">Logout</Link>
            //     </p>
            // </div>
            <div id="viewport">

                <div id="sidebar">
                    <header>
                        <a href="#">NKL Inernet Banking</a>
                    </header>
                    <ul className="nav">
                        <li>
                            <a href="#">
                                <i className="zmdi zmdi-view-dashboard"></i> Danh sách tài khoản
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="zmdi zmdi-link"></i> Chuyển tiền
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="zmdi zmdi-widgets"></i> Chuyển tiền tới ngân hàng khác
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="zmdi zmdi-calendar"></i> Danh sách nợ
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="zmdi zmdi-info-outline"></i> Danh sách người nhận
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="zmdi zmdi-settings"></i> Thông tin
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="zmdi zmdi-comment-more"></i> Thẻ
                            </a>
                        </li>
                    </ul>
                </div>

                <div id="content">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="#"><i className="zmdi zmdi-notifications text-danger"></i>
                                    </a>
                                </li>
                                <li>
                                    <Link to="/login">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <h1>Danh sách tài khoản</h1>
                        <p>

                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const mapDispatchToProps = (dispatch) => ({
    userActions: () => dispatch(userActions.getAll())
});

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };