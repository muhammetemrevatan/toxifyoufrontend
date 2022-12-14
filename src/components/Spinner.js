import React from 'react';

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center pt-2 pb-2">
            <div className="spinner-border text-black-50" >
                <span className="sr-only"/>
            </div>
        </div>
    );
};

export default Spinner;