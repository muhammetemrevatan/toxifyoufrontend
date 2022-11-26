import React from 'react';
import { withRouter } from 'react-router-dom';
import { Authentication } from '../shared/AuthenticationContext';

class ProfileCard extends React.Component {

    static contextType = Authentication;

    render() {
        const pathUsername = this.props.match.params.username
        const loggedInUsername = this.context.state.username;

        let message = "We cannot edit";
        if (pathUsername === loggedInUsername) {

            message = "We can edit";
        }
        return (
            <div>
                {message}
            </div>
        );
    }
};

export default withRouter(ProfileCard);