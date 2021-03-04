import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { login, register, checkAuth, resetError } from '../../store/auth/actionCreators';
import { RootState } from '../../store/rootState';
import './Auth.scss';
import { Redirect } from 'react-router-dom';
import Loading from '../common/Loading';
import { ErrorModel, User } from '../../store/auth/types';
import { ROUTES } from '../../store/Constants';

interface LoginRegisterProps {
    user: User;
    waiting: boolean;
    error: ErrorModel;
    resetError: () => void;
    checkAuth: (guid: string) => void;
    login: (username: string, password: string) => void;
    register: (username: string, password: string) => void;
}

interface LoginRegisterState {
    username: string;
    password: string;
    confirm_password: string;
    register: boolean;
}

class LoginRegister extends React.Component<LoginRegisterProps, LoginRegisterState> {
    state = {
        username: '',
        password: '',
        confirm_password: '',
        register: false
    }
    login() {
        const { username, password, register } = this.state;
        register ? this.props.register(username, password) :
            this.props.login(username, password)
    }
    checkDisabled() {
        const { username, password, register, confirm_password } = this.state;
        if (register === false) {
            if (username.trim() === '' || password.trim() === '') {
                return true
            }
        } else if (register === true) {
            if (password !== confirm_password
                || username.trim() === ''
                || password.trim() === '') { return true }
        }
        return false;
    }
    changeForm() {
        const { register } = this.state;

        this.setState({ register: !register });
        this.props.resetError()
    }
    render() {
        const { username, password, register, confirm_password } = this.state;
        const { error } = this.props;
        if (this.props.user.isAuthenticated) return <Redirect to={ROUTES.HOME} />
        return (
            <div className="admin-container">
                {this.props.waiting && <Loading />}
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <Input type="text" value={username}
                            onChange={(event: any) => this.setState({ username: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input type="password" value={password}
                            onChange={(event: any) => this.setState({ password: event.target.value })}
                        />
                    </Form.Field>
                    {
                        register &&
                        <Form.Field>
                            <label>Confirm Password</label>
                            <Input type="password" value={confirm_password}
                                onChange={(event: any) => this.setState({ confirm_password: event.target.value })}
                            />
                        </Form.Field>
                    }
                    <div className="button-container flex-row">
                        <Button disabled={this.checkDisabled()} type="submit" onClick={() => this.login()}>{register ? 'Register' : 'Login'}</Button>
                        <span className="flex-grow"></span>
                        <a className="login-link" onClick={() => this.changeForm()}>{register ? 'Login' : 'Register'}</a>
                    </div>
                    {
                        error.isError &&
                        <div className="error-message">{error.message}</div>
                    }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    const { error, user } = state.AuthState;
    const { waiting } = state.CommonState;
    return { user, waiting, error }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        login, register, checkAuth, resetError
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
