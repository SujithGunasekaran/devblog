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

    return { postForm, handleFormField }

}

export default useForm;
