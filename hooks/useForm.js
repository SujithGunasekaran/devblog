import { useState } from 'react';

const useForm = () => {

    const [postForm, setPostForm] = useState({});
    const [formError, setFormError] = useState([]);

    const handleFormField = (e) => {
        setPostForm((prevPostForm) => {
            return {
                ...prevPostForm,
                [e.target.name]: e.target.value
            }
        })
        if (formError.length > 0) setFormError([]);
    }

    const setPostInfo = (value = {}) => {
        setPostForm((prevPostForm) => {
            return {
                ...prevPostForm,
                ...value
            }
        })
    }

    return { postForm, formError, setFormError, handleFormField, setPostInfo }

}

export default useForm;
