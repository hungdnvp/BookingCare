import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';

import { userIsAuthenticatedAdmin } from '../hoc/authentication';

class System extends Component {
    render() {
        const { isLoggedIn, doctorMenuPath } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />} 
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage-user" component={userIsAuthenticatedAdmin(UserRedux)} />
                            <Route path="/system/manage-doctor" component={userIsAuthenticatedAdmin(ManageDoctor)} />
                            <Route path="/system/manage-specialty" component={userIsAuthenticatedAdmin(ManageSpecialty)} />
                            <Route path="/system/manage-clinic" component={userIsAuthenticatedAdmin(ManageClinic)} />

                            {/* <Route path="/system/manage-user" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} /> */}

                            <Route component={() => { return (<Redirect to={doctorMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        doctorMenuPath: state.app.doctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
