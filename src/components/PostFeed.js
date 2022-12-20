import React, {useEffect, useState} from 'react';
import {getNewPostCount, getNewPosts, getOldPosts, getPost} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import PostView from "./PostView";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";
import {useHistory, useParams} from "react-router-dom";

const PostFeed = () => {
    const [postPage, setPostPage] = useState({content: [], last: true, number: 0});
    const {t} = useTranslation();
    const [firstLoadPost, setFirstLoadPost] = useState(true);
    const history = useHistory();
    const {push} = history;
    const {username} = useParams();
    const path = username ? `/api/1.0/users/${username}/posts?currentPage=` : `/api/1.0/posts?currentPage=`;
    const initialPostLoadProgress = useApiProgress('get', path);
    const [newPostCount, setNewPostCount] = useState(0);
    let lastPostsId = 0;
    let firstPostsId = 0;
    if (postPage.content.length > 0) {
        firstPostsId = postPage.content[0].id;
        const lastPostIndex = postPage.content.length - 1;
        lastPostsId = postPage.content[lastPostIndex].id;
    }

    const oldPostPath = username ? `/api/1.0/users/${username}/posts/` + lastPostsId : `/api/1.0/posts/` + lastPostsId;
    const loadOldPostsProgress = useApiProgress('get', oldPostPath, true);

    const newPostPath = username ? `/api/1.0/users/${username}/posts/${firstPostsId}?direction=after`
        : `/api/1.0/posts/${firstPostsId}?direction=after`;
    const loadNewPostsProgress = useApiProgress('get', newPostPath, true);

    useEffect(() => { // websocket ile yapılabilir. sürekli istek atarak yeni post sayısını sayıyoruz.
        const getCount = async () => {
            const response = await getNewPostCount(firstPostsId, username);
            setNewPostCount(response.data.count);
        }
        let looper = setInterval(getCount, 3000);
        return function cleanup() {
            clearInterval(looper);
        }
    }, [firstPostsId, username]);


    useEffect(() => {
        const loadPosts = async (number) => {
            if (initialPostLoadProgress) {
                return;
            }
            try {
                const response = await getPost(number, username);
                setPostPage(previous => ({
                    ...response.data,
                    content: [...previous.content, ...response.data.content]
                }));

            } catch (error) {

            }
        }
        loadPosts();
    }, [username]);

    const loadOldPosts = async () => {
        const response = await getOldPosts(lastPostsId, username);
        setPostPage(previous => ({
            ...response.data,
            content: [...previous.content, ...response.data.content]
        }));
    }

    const loadNewPosts = async () => {
        const response = await getNewPosts(firstPostsId, username);
        setPostPage(previous => ({
            ...previous,
            content: [...response.data, ...previous.content]
        }));
        setNewPostCount(0);
    }

    const {content, last, number} = postPage;

    if (content.length === 0) {
        return <div className="text-center alert alert-light mt-3">{initialPostLoadProgress ?
            <Spinner/> : t('There are no posts') }</div>
    }

    return (
        <div>
            {newPostCount > 0 &&
                <div className="btn btn-outline-secondary w-100 text-center mt-2 p-3 border-0"
                     onClick={loadNewPosts}
                     style={{cursor: loadNewPostsProgress ? "not-allowed" : 'pointer'}}>
                    {loadNewPostsProgress ?
                        <Spinner/> : t('There are new (' + newPostCount + ') posts')}
                </div>}
            {content.map((post) => <PostView key={post.id} post={post}/>)}
            {!last &&
                <div className="btn btn-outline-secondary w-100 text-center mt-2 mb-2 border-0"
                     onClick={loadOldPosts}
                     style={{cursor: loadOldPostsProgress ? "not-allowed" : 'pointer'}}>
                    {loadOldPostsProgress ? <Spinner/> : t('Load before posts')}
                </div>}
        </div>
    );
};

export default PostFeed;
