import React from 'react';
import { changeLanguage } from '../api/apiCalls';
import { useTranslation } from 'react-i18next'

const LanguageSelector = props => {
    const { i18n } = useTranslation();
    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    return (
        <div className='container d-grid'>
            <span className=" fi fi-tr me-1 mb-2" onClick={() => onChangeLanguage('tr')} style={{cursor: "pointer"}}></span>
            <span className="fi fi-us me-1" onClick={() => onChangeLanguage('en')} style={{cursor: "pointer"}}></span>
        </div>
    );
};

export default LanguageSelector;