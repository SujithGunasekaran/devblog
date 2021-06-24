import { useState } from 'react';

const useForm = () => {

    const [postForm, setPostForm] = useState({});

    const handleFormField = (e) => {
        setPostForm((prevPostForm) => {
            return {
                ...prevPostForm,
                [e.target.name]: e.target.value
            }
        })
    }

    const setPostInfo = (value = {}) => {
        setPostForm((prevPostForm) => {
            return {
                ...prevPostForm,
                ...value
            }
        })
    }

    return { postForm, handleFormField, setPostInfo }

}

export default useForm;
