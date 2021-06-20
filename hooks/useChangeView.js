import { useState } from 'react';

const useChangeView = (initialView) => {

    const [currentView, setCurrentView] = useState(initialView);

    const handleChangeView = (viewName) => {
        setCurrentView(viewName);
    }

    return { currentView, handleChangeView };

}

export default useChangeView;
