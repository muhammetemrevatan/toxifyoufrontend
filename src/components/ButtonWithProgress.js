import React from 'react';

const ButtonWithProgress = props => {
    const { disabled, onClick, pendingApiCallBack, text } = props;

    return (
        <button className='btn btn-primary mt-3'
                type='button'
                disabled={disabled}
                onClick={onClick}
        >
            {pendingApiCallBack && <span className='spinner-border spinner-border-sm me-2'></span>} {text}
        </button>
    );
};

export default ButtonWithProgress;