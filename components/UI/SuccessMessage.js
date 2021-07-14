import React, { Fragment } from 'react';
import { CancelIcon } from '../icons';

const SuccessMessage = (props) => {

    const { message = '', handleCloseSuccessMessage, cssClass = "" } = props;

    return (
        <Fragment>
            <div className={`success_alert  ${cssClass}`} id="success_alert">
                {message}
                <CancelIcon cssClass="alert_cancel" handleEvent={handleCloseSuccessMessage} />
            </div>
        </Fragment>
    )

}

export default SuccessMessage;
