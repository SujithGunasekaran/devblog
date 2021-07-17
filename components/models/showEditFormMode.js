import { useEffect, useState } from 'react';
import withApollo from '../../hoc/withApollo';
import useForm from '../../hooks/useForm';
import { CancelIcon } from '../icons';
import { validateInputField } from '../../utils';
import ErrorMessage from '../UI/ErrorMessage';
import SuccessMessage from '../UI/SuccessMessage';
import { useUpdateuserInfo } from '../../apollo/apolloActions';

const showEditFormModel = (props) => {

    // states
    const [showSuccess, setShowSuccess] = useState(null);

    //props
    const { userInfo, handleCloseEditModel } = props;

    // hooks
    const { postForm, handleFormField, formError, setFormError, setPostInfo } = useForm();

    // mutatios
    const [updateUserInfo, { error, loading }] = useUpdateuserInfo();

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { userData = {} } = userInfo.getUserById;
        const isFormValid = validateInputField(['username', 'description'], postForm, setFormError);
        if (isFormValid) {
            try {
                const variables = {
                    id: userData._id,
                    username: postForm.username,
                    userdescription: postForm.description,
                    usercompany: postForm.company
                };
                await updateUserInfo({ variables });
                setShowSuccess('Info updated Successfully');
            }
            catch (err) {
                console.log(err);
            }
        }
    }


    const successMessage = () => (
        <SuccessMessage
            message={showSuccess}
            handleCloseSuccessMessage={() => setShowSuccess(null)}
        />
    )

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
                    showSuccess &&
                    successMessage()
                }
                {
                    error &&
                    errorMessage('Error while updating userInfo')
                }
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
                    <button disabled={loading} type="submit" className="model_form_edit_btn">{loading ? 'updating...' : 'save'}</button>
                </form>
            </div>
        </div>
    )

};

export default withApollo(showEditFormModel);
