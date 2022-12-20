import React from 'react';
import UserList from "../components/UserList";
import Post from "../components/Post";
import {useSelector} from "react-redux";
import PostFeed from "../components/PostFeed";

const HomePage = () => {
    const {isLoggedIn} = useSelector(store => ({isLoggedIn: store.isLoggedIn}))

    return (
        <div className='container'>
            <div className="row">
                <div className="col-4 col-md-4 ps-0">
                    <UserList/>
                </div>
                <div className="col-8 col-md-8">
                    {isLoggedIn && <Post/>}
                    <PostFeed/>
                </div>

            </div>
        </div>);
};

export default HomePage;