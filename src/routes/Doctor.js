import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import { userIsAuthenticatedDoctor } from '../hoc/authentication';

class Doctor extends Component {
    render() {
        const {isLoggedIn ,systemMenuPath} = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />} 
                <div className="Doctor-container">
                    <div className="Doctor-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={userIsAuthenticatedDoctor(ManageSchedule)} />
                            {/* <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} /> */}

                            <Route path="/doctor/manage-patient" component={userIsAuthenticatedDoctor(ManagePatient)} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                            
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
