import { prettyUserName } from '../../utils';
import PageLink from '../PageLink';

const UserListItem = (props) => {

    const { userInfo, userList, handleFollowUserFromList, removeUserLoading, followUserLoading, handleUnFollowUserFromList, loggedUserID } = props;
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
                            <button disabled={removeUserLoading} className="follow_btn" onClick={() => handleUnFollowUserFromList(loggedUserID, userInfo._id)}>{removeUserLoading ? 'UnFollowing...' : 'UnFollow'}</button> :
                            <button disabled={followUserLoading} className="follow_btn" onClick={() => handleFollowUserFromList(loggedUserID, userInfo._id)}>{followUserLoading ? 'Following...' : 'Follow'}</button>
                        : null
                    : null
            }
        </div>
    )

};

export default UserListItem;
