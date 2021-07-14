import UserListItem from './UserListItem';
import { Fragment } from 'react';

const UserListWrapper = (props) => {

    const {
        userList, currentView,
        loggedUserFollowingList,
        handleFollowUserFromList, handleUnFollowUserFromList,
        loggedUserID
    } = props;

    return (
        <div>
            {
                currentView === 'follower' ?
                    userList && userList.userData && userList.userData.follower && userList.userData.follower.length > 0 ?
                        userList.userData.follower.map((userInfo, index) => (
                            <Fragment key={index}>
                                <UserListItem
                                    key={index}
                                    loggedUserID={loggedUserID}
                                    userList={loggedUserFollowingList}
                                    handleFollowUserFromList={handleFollowUserFromList}
                                    handleUnFollowUserFromList={handleUnFollowUserFromList}
                                    userInfo={userInfo}
                                />
                            </Fragment>
                        )) :
                        <div className="not_available_message ">No user has followed you</div>
                    : null
            }
            {
                currentView === 'following' ?
                    userList && userList.userData && userList.userData.following && userList.userData.following.length > 0 ?
                        userList.userData.following.map((userInfo, index) => (
                            <Fragment key={index}>
                                <UserListItem
                                    key={index}
                                    loggedUserID={loggedUserID}
                                    userList={loggedUserFollowingList}
                                    handleFollowUserFromList={handleFollowUserFromList}
                                    handleUnFollowUserFromList={handleUnFollowUserFromList}
                                    userInfo={userInfo}
                                />
                            </Fragment>
                        )) :
                        <div className="not_available_message ">Your are not following anyone</div>
                    : null
            }
        </div>
    )

}

export default UserListWrapper;
