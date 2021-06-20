import { useState } from 'react';


const useModelControl = (initialView) => {

    const [showModel, setShowModel] = useState(initialView)

    const handleShowModel = (value) => {
        setShowModel(value);
    }

    return { showModel, handleShowModel };

}

export default useModelControl;
