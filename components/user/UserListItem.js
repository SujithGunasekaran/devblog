import { prettyUserName } from '../../utils';

const UserListItem = (props) => {

    const { userInfo, userList, isUserLoggedIn } = props;

    return (
        <div className="user_middle_list_container">
            <img src={userInfo?.userprofile} className="profile" loading="lazy" />
            <div className="username">{prettyUserName(userInfo.username)}</div>
            {
                isUserLoggedIn ?
                    userList.has(userInfo._id) ?
                        <button className="follow_btn">UnFollow</button> :
                        <button className="follow_btn">Follow</button>
                    : null
            }
        </div>
    )

};

export default UserListItem;
