import React from 'react';
import {Link} from "react-router-dom";
import ProfileImage from "./ProfileImage";

function UserListItem(props) {

    const {user} = props;
    const {username, displayName, image} = user;

    return (
        <Link to={`/${username}`} className="list-group-item list-group-item-action">
            <ProfileImage
                className="rounded-circle"
                width="32"
                alt={`${username} profile`}
                image={image} />
            <span className="ps-1">
                {username} {"#"} {displayName}
            </span>
        </Link>)
}

export default UserListItem;