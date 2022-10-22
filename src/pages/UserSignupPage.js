import React, { createElement } from 'react';
import { signup } from '../api/apiCalls';
import Input from '../components/Input';

class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCallBack: false,
        errors: {}
    };

    onChange = event => {
        const { value, name: key } = event.target;
        const errors = { ...this.state.errors };
        errors[key] = undefined;
        this.setState({
            [key]: value, errors
        });
    };

    onClickSignup = async event => {
        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {
            username,
            displayName,
            password
        }

        this.setState({ pendingApiCallBack: true });

        try {
            const response = await signup(body);
            console.log(response.data);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }
        this.setState({ pendingApiCallBack: false });
    };

    render() {

        const { pendingApiCallBack, errors } = this.state;
        const { username, displayName, password } = errors;

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>Sign up</h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange} />
                    <Input name="displayName" label="DisplayName" error={displayName} onChange={this.onChange} />
                    <Input name="password" label="Password" error={password} onChange={this.onChange} type="password" />

                    <div className='form-group'>
                        <label className='mb-1 mt-2'>Password Repeat</label>
                        <input className='form-control' name='passwordRepeat' onChange={this.onChange} type="password" />
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary mt-3' type='button' disabled={pendingApiCallBack} onClick={this.onClickSignup}>
                            {pendingApiCallBack && <span className='spinner-border spinner-border-sm me-2'></span>}
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;              