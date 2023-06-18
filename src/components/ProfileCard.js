import React, {useEffect, useState} from 'react';
import ProfileImage from "./ProfileImage";
import {useTranslation} from "react-i18next";
import Input from "./Input";
import {setEmailOtpPost, updateUser} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {updateSuccess} from "../redux/authActions";

const ProfileCard = props => {

    const [inChangeEdit, setInChangeEdit] = useState(false);
    const [inEmailApproved, setInEmailApproved] = useState(false);
    const {username: loggedInUsername} = useSelector(store => ({username: store.username}))
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    // const {user} = props;
    const [tempDisplayNameValue, setTempDisplayNameValue] = useState();
    const [tempOtpCode, setTempOtpCode] = useState();
    const [user, setUser] = useState({});
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    const {username, displayName, image} = user;
    const {t} = useTranslation();

    const dispatch = useDispatch();
    const history = useHistory();
    const {push} = history;

    useEffect(() => {
        if (!inChangeEdit) {
            setTempDisplayNameValue(undefined);
            setNewImage(undefined);
        } else {
            setTempDisplayNameValue(displayName);
        }
    }, [inChangeEdit, displayName]);

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => {
            return {
                ...previousValidationErrors,
                displayName: undefined
            }
        })
    }, [tempDisplayNameValue]);

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => ({
            ...previousValidationErrors,
            image: undefined
        }))
    }, [newImage]);


    const onClickSave = async (event) => {
        let image;

        if (newImage) {
            image = newImage.split(',')[1];
        }

        const body = {
            displayName: tempDisplayNameValue,
            image
        };
        try {
            const response = await updateUser(username, body);
            setInChangeEdit(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
            push('/');
        } catch (e) {
            setValidationErrors(e.response.data.validationErrors);
        }
    }

    const onClickEmailApproved = async (event) => {
        const body = {
            otpCode: tempOtpCode
        };
        try {
            const response = await setEmailOtpPost(body);
            setInEmailApproved(true);
            push('/');
        } catch (e) {
            setValidationErrors(e.response.data.validationErrors);
        }
    }

    const onChangeInputValue = (event) => {
        setTempDisplayNameValue(event.target.value)
    }

    const onChangeOtpValue = (event) => {
        setTempOtpCode(event.target.value)
    }

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

    const editable = pathUsername === loggedInUsername;

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImage
                    className="rounded-circle shadow"
                    width="200"
                    height="200"
                    alt={`${username} profile`}
                    image={image}
                    tempimage={newImage}
                />
            </div>
            <div className="card-body">
                {!inChangeEdit && (
                    <>
                        <h3>{displayName} @ {username}</h3>
                        {editable &&
                            <button className="btn btn-success d-inline-flex" onClick={() => setInChangeEdit(true)}>
                                <i className="material-icons">edit</i>
                                {t('Edit')}
                            </button>}
                    </>)
                }
                {inChangeEdit && (
                    <div>
                        <Input label={t('Change Your Display Name')}
                               defaultValue={displayName}
                               onChange={onChangeInputValue}
                               error={validationErrors.displayName}
                        />
                        <Input type='file'
                               onChange={onChangeFile}
                               error={validationErrors.image}
                        />
                        <button className="btn btn-primary me-1 mt-2" style={{display: "inline-grid"}}
                                onClick={onClickSave}>
                            {pendingApiCall &&
                                <span className='spinner-border spinner-border-sm ms-auto me-auto'></span>}
                            {!pendingApiCall && <i className="material-icons">save</i>}
                            {t('Save')}
                        </button>
                        {!pendingApiCall &&
                            <button className="btn btn-danger ms-1 mt-2 0" style={{display: "inline-grid"}}
                                    onClick={() => setInChangeEdit(false)}>
                                <i className="material-icons">close</i>
                                {t('Close')}
                            </button>}
                    </div>
                )
                }
            </div>

            <div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>

            {!inEmailApproved && (
                <div className="d-inline-block">
                        <Input label={t('enterotpcode')}
                               defaultValue={""}
                               onChange={onChangeOtpValue}
                               error={""}
                        />
                        <button className="btn btn-primary d-inline-flex m-2" onClick={onClickEmailApproved}>
                            {t('Email Approved')}
                        </button>
                </div>)
            }
        </div>)
}

export default ProfileCard;
