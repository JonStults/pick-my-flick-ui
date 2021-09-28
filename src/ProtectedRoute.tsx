import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router';
import { User } from './store/auth/types';
import { ROUTES, TOKEN } from './store/Constants';
import { RootState } from './store/rootState';

export interface ProtectedRouteProps extends RouteProps {
    user: User;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    render() {
        let redirectPath: string = '';
        if (this.props.user.isAuthenticated === null) {
            //auth info hasn't been loaded yet - return a blank page and wait for rerender when it's updated
            return '';
        }
        else if (!this.props.user.isAuthenticated || !localStorage.getItem(TOKEN)) {
            //auth info loaded but token isn't present or is expired
            redirectPath = ROUTES.LOGIN;
        }
        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{ pathname: redirectPath }} />);
            return <Route {...this.props} component={renderComponent} render={undefined} />;
        }
        return <Route {...this.props} />;
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        user: state.AuthState.user
    }
};

export default connect(mapStateToProps)(ProtectedRoute);
