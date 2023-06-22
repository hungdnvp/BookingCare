import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsAuthenticatedDoctor = connectedRouterRedirect({
    authenticatedSelector: state => (state.user.userInfo.roleId === 'R2') ? true : false,
    wrapperDisplayName: 'UserIsAuthenticated',
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/system/manage-user'
});

export const userIsAuthenticatedAdmin = connectedRouterRedirect({
    authenticatedSelector: state => (state.user.userInfo.roleId === 'R1') ? true : false,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/doctor/manage-schedule'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});