import React from 'react';

const ButtonWithProgress = props => {
    const { disabled, onClick, pendingApiCallBack, text, className } = props;

    return (
        <button className={className || 'btn btn-primary'}
                type='button'
                disabled={disabled}
                onClick={onClick}
        >
            {pendingApiCallBack && <span className='spinner-border spinner-border-sm me-2'></span>} {text}
        </button>
    );
};

export default ButtonWithProgress;