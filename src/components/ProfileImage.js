import React from 'react';
import defaultImage from '../assets/Capture.PNG';

const ProfileImage = (props) => {

    const {image, tempimage} = props;

    let imageSource = defaultImage;
    if (image) {
        imageSource = 'images/' + image;
    }

    return (
        <img
            alt={`Profile`}
            src={tempimage || imageSource} {...props}
            onError={(event)=> {event.target.src = defaultImage}} />
    );
};

export default ProfileImage;