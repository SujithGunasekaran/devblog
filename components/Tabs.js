import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const Tabs = (props) => {

    const { tabList, currentTab, cssClass, handleTab, showSelect = false } = props;

    const handleSelectChange = (e) => {
        handleTab(e.target.value.toLowerCase());
    }

    return (
        <>
            {
                tabList.length > 0 && !showSelect &&
                tabList.map((tabInfo, index) => (
                    <Tooltip key={index} TransitionComponent={Zoom} title={tabInfo} arrow>
                        <div onClick={() => handleTab(tabInfo.toLowerCase())} className={`${cssClass} ${currentTab.toLowerCase() === tabInfo.toLowerCase() ? 'active' : ''}`}>{tabInfo}</div>
                    </Tooltip>
                ))
            }
            {
                showSelect &&
                <select className="home_middle_post_select" onChange={(e) => handleSelectChange(e)}>
                    {
                        tabList.map((tabInfo, index) => (
                            <option className="options" key={index} value={tabInfo}>{tabInfo}</option>
                        ))
                    }
                </select>
            }
        </>
    )

};

export default Tabs;
