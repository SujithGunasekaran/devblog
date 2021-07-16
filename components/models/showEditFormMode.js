import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { CancelIcon } from '../icons';
import { validateInputField } from '../../utils';
import ErrorMessage from '../UI/ErrorMessage';

const showEditFormModel = (props) => {

    //props
    const { userInfo, handleCloseEditModel } = props;

    // hooks
    const { postForm, handleFormField, formError, setFormError, setPostInfo } = useForm();

    useEffect(() => {
        if (userInfo.getUserById) {
            const { userData = {} } = userInfo.getUserById;
            setPostInfo({
                username: userData?.username ?? '',
                description: userData?.userdescription ?? '',
                company: userData?.usercompany ?? ''
            })
        }
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validateInputField(['username', 'description', 'company'], postForm, setFormError);
        if (isFormValid) {

        }
    }


    const errorMessage = (content) => (
        <ErrorMessage
            message={content ? content : showError}
            handleCloseErrorMessage={() => { setFormError([]) }}
        />
    );

    return (
        <div>
            <div className="model_form_container">
                <div className="model_head_container model_show_border">
                    <div className="model_head_heading">Edit Profile</div>
                    <CancelIcon cssClass={"model_head_cancel_icon"} handleEvent={handleCloseEditModel} />
                </div>
                {
                    formError.length > 0 &&
                    errorMessage(`Please Enter ${formError.map(name => `${name[0].toUpperCase()}${name.slice(1)}`).join(', ')}`)
                }
                <form onSubmit={handleFormSubmit}>
                    <div className="model_form_input_container">
                        <div className="model_form_input_label">Username</div>
                        <input
                            type="text"
                            name="username"
                            className="model_form_input_field"
                            value={postForm?.username ?? ''}
                            onChange={handleFormField}
                        />
                    </div>
                    <div className="model_form_input_container">
                        <div className="model_form_input_label">Description</div>
                        <input
                            type="text"
                            name="description"
                            className="model_form_input_field"
                            value={postForm?.description ?? ''}
                            onChange={handleFormField}
                        />
                    </div>
                    <div className="model_form_input_container">
                        <div className="model_form_input_label">Company</div>
                        <input
                            type="text"
                            name="company"
                            className="model_form_input_field"
                            value={postForm?.company ?? ''}
                            onChange={handleFormField}
                        />
                    </div>
                    <button type="submit" className="model_form_edit_btn">Save</button>
                </form>
            </div>
        </div>
    )

};

export default showEditFormModel;
