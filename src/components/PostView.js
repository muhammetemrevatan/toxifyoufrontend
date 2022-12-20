import React from 'react';
import ProfileImage from "./ProfileImage";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {useTranslation} from "react-i18next";

const PostView = (props) => {
    const {post} = props;
    const {content, user, timestamp} = post;
    const {username, displayName, image} = user;
    const {i18n} = useTranslation();
    const formatted = format(timestamp, i18n.language);

    return (
        <div className="card p-1 mt-3 ps-2 border-success border-opacity-50">
            <div className="d-flex m-1 ms-2">
                <ProfileImage image={image} className="rounded-circle" width={32} height={32}/>
                <Link to={`/user/${username}`} className="flex-fill m-auto ms-2 text-decoration-none">
                    <h6 className="d-inline">
                        {displayName}
                    </h6>
                    <span className="position-absolute end-0 me-3">
                        {formatted}
                    </span>
                </Link>
            </div>
            <div className="mb-2 ps-5 mt-3">
                {content}
            </div>
        </div>
    );
};

export default PostView;
