

const ShowLogoutConfirm = (props) => {

    const { confirm, cancel, info, confirmBtnText } = props;

    return (
        <div>
            <div className="model_container">
                <div className="model_head_container">
                    <div className="model_head_heading medium_font">
                        {info}
                    </div>
                </div>
                <div className="model_footer_container">
                    <button className="model_footer_cancel_btn" onClick={() => cancel()}>Cancel</button>
                    <button className="model_footer_ok_btn" onClick={() => confirm()}>{confirmBtnText}</button>
                </div>
            </div>
        </div>
    )

}

export default ShowLogoutConfirm;
