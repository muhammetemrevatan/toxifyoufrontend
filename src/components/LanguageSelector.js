import React from 'react';
import { changeLanguage } from '../api/apiCalls';
import { withTranslation } from 'react-i18next'

const LanguageSelector = props => {
    const onChangeLanguage = language => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    return (
        <div className='container'>
            <span className="fi fi-tr cursor-pointer me-1" onClick={() => onChangeLanguage('tr')}></span>
            <span className="fi fi-us cursor-pointer me-1" onClick={() => onChangeLanguage('en')}></span>
        </div>
    );
};

export default withTranslation()(LanguageSelector);