import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import ProfileImage from "./ProfileImage";
import {useTranslation} from "react-i18next";
import {setUserPost} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";

const Post = () => {
    const {image} = useSelector((store) => ({
        image: store.image
    }))
    const [focused, setFocused] = useState(1);
    const [buttonDisplayFocused, setButtonDisplayFocused] = useState(false);
    const [post, setPost] = useState('');
    const {t} = useTranslation();
    const [errors, setErrors] = useState('');
    const [textAreaClass, setTextAreaClass] = useState('form-control');
    const pendingApiCall = useApiProgress('post', '/api/1.0/posts');

    useEffect(() => {
        if (!buttonDisplayFocused) {
            setPost('');
        }
    }, [buttonDisplayFocused]);

    const onClickPost = async () => {
        const body = {
            content: post
        }
        try {
            await setUserPost(body);
            setButtonDisplayFocused(false);
            setFocused(1);
        } catch (e) {
            setErrors(e.response.data.validationErrors.content);
            setTextAreaClass('form-control is-invalid');
        }
    }

    return (
        <div className="card p-1 flex-row">
            <ProfileImage image={image} width="32" height="32" className="rounded-circle me-1"/>
            <div className="flex-fill">
                <textarea className={textAreaClass}
                          rows={focused}
                          onFocus={() => {
                              setFocused(3);
                              setButtonDisplayFocused(true)
                          }}
                          onChange={(e) => {
                              setPost(e.target.value)
                              setTextAreaClass('form-control')
                          }}
                          value={post}
                />
                <div className="invalid-feedback">
                    {errors}
                </div>

                {buttonDisplayFocused && <div className="text-end mt-1">

                    <ButtonWithProgress onClick={onClickPost}
                                        text={"Send"}
                                        pendingApiCallBack={pendingApiCall}
                                        disabled={pendingApiCall}
                    />
                    <button className="btn btn-danger ms-1"
                            onClick={() => {
                                setButtonDisplayFocused(false);
                                setFocused(1);
                                setTextAreaClass('form-control');
                            }}
                            disabled={pendingApiCall}>
                        {t('Close')}
                    </button>
                </div>
                }
            </div>
        </div>
    );
};

export default Post;
