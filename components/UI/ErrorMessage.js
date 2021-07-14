import React, { Fragment } from 'react';
import { CancelIcon } from '../icons';

const ErrorMessage = (props) => {

    const { message = "", handleCloseErrorMessage, cssClass = "" } = props;

    return (
        <Fragment>
            <div className={`failure_alert ${cssClass}`} id="error_alert">
                {message}
                <CancelIcon cssClass="alert_cancel" handleEvent={handleCloseErrorMessage} />
            </div>
        </Fragment>
    )

};

export default ErrorMessage;
