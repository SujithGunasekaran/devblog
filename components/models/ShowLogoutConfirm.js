

const ShowLogoutConfirm = (props) => {

    const { confirmLogout, cancelLogout } = props;

    return (
        <div>
            <div className="model_container">
                <div className="model_head_container">
                    <div className="model_head_heading medium_font">
                        Are you sure you want Logout ?
                    </div>
                </div>
                <div className="model_footer_container">
                    <button className="model_footer_cancel_btn" onClick={() => cancelLogout()}>Cancel</button>
                    <button className="model_footer_ok_btn" onClick={() => confirmLogout()}>Logout</button>
                </div>
            </div>
        </div>
    )

}

export default ShowLogoutConfirm;
