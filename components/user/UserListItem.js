import { memo } from 'react';
import { prettyUserName } from '../../utils';
import PageLink from '../PageLink';

const UserListItem = memo((props) => {

    const { userInfo, userList, handleFollowUserFromList, handleUnFollowUserFromList, loggedUserID } = props;

    return (
        <div className="user_middle_list_container">
            <img src={userInfo?.userprofile} className="profile" loading="lazy" />
            <PageLink href={'/user/[userID]'} as={`/user/${userInfo._id}`}>
                <a className="user_middle_card_link">
                    <div className="username">{prettyUserName(userInfo.username)}</div>
                </a>
            </PageLink>
            {
                loggedUserID ?
                    loggedUserID !== userInfo._id ?
                        userList.has(userInfo._id) ?
                            <button className="follow_btn" onClick={() => handleUnFollowUserFromList(loggedUserID, userInfo._id)}>UnFollow</button> :
                            <button className="follow_btn" onClick={() => handleFollowUserFromList(loggedUserID, userInfo._id)}>Follow</button>
                        : null
                    : null
            }
        </div>
    )

});

export default UserListItem;
