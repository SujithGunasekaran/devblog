import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const Tabs = (props) => {

    const { tabList, currentTab, cssClass, handleTab } = props;

    return (
        <>
            {
                tabList.length > 0 &&
                tabList.map((tabInfo, index) => (
                    <Tooltip key={index} TransitionComponent={Zoom} title={tabInfo} arrow>
                        <div onClick={() => handleTab(tabInfo.toLowerCase())} className={`${cssClass} ${currentTab.toLowerCase() === tabInfo.toLowerCase() ? 'active' : ''}`}>{tabInfo}</div>
                    </Tooltip>
                ))
            }
        </>
    )

};

export default Tabs;
