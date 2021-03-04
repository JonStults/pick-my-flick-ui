import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../store/auth/types';
import jwt from 'jsonwebtoken';
import {
    udpateUserInfo
} from '../../store/auth/actionCreators';
import { TOKEN, DEFAULT_USER_INFO } from '../../store/Constants';
import { RootState } from '../../store/rootState';

export interface AuthLoaderProps {
    user: User;
    updateUserInfo: (userModel: User) => void;
}

export class AuthLoader extends React.Component<AuthLoaderProps> {

    componentDidMount() {
        this.checkJWTTokenInLocalStore();
    }

    checkJWTTokenInLocalStore = () => {
        const userToken = localStorage.getItem(TOKEN);
        let valid = false;
        if (userToken != null) {
            var decoded = jwt.decode(userToken, { complete: true, json: true }) as { [key: string]: any };
            if (decoded !== null) {
                const userModel: User = {
                    exp: decoded.payload.exp,
                    username: decoded.payload.username,
                    id: decoded.payload.id,
                    isAuthenticated: true
                }
                const currentTime = new Date().getTime() / 1000;
                if (userModel.exp < currentTime) {
                    localStorage.removeItem(TOKEN);

                    this.props.updateUserInfo(DEFAULT_USER_INFO);
                } else {
                    this.props.updateUserInfo(userModel);
                    valid = true;
                }
            }
        }

        if (!valid && (this.props.user.isAuthenticated === null || this.props.user.isAuthenticated === true)) {
            //sets isAuthenticated to false to update that we loaded auth info (or lack there of)
            let data = { ...DEFAULT_USER_INFO, isAuthenticated: false }
            this.props.updateUserInfo(data);
        }
        return valid;
    }

    render() {
        return null;
    }
}


const mapStateToProps = (state: RootState) => {
    const { user } = state.AuthState;
    return { user }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateUserInfo: (userModel: User) => {
            dispatch(udpateUserInfo(userModel))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoader);
