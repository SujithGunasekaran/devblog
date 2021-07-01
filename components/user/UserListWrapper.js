import UserListItem from './UserListItem';
import PageLink from '../PageLink';

const UserListWrapper = (props) => {

    const { userList, currentView, loggedUserFollowList, loggedUserFollowingList, isUserLoggedIn } = props;

    return (
        <div>
            {
                currentView === 'follower' ?
                    userList && userList.userData && userList.userData.follower && userList.userData.follower.length > 0 ?
                        userList.userData.follower.map((userInfo, index) => (
                            <PageLink href={'/user/[userID]'} as={`/user/${userInfo._id}`}>
                                <a className="user_middle_card_link" key={index}>
                                    <UserListItem
                                        isUserLoggedIn={isUserLoggedIn}
                                        userList={loggedUserFollowList}
                                        userInfo={userInfo}
                                    />
                                </a>
                            </PageLink>

                        )) :
                        <div className="not_available_message ">No user has followed you</div>
                    : null
            }
            {
                currentView === 'following' ?
                    userList && userList.userData && userList.userData.following && userList.userData.following.length > 0 ?
                        userList.userData.following.map((userInfo, index) => (
                            <PageLink href={'/user/[userID]'} as={`/user/${userInfo._id}`}>
                                <a className="user_middle_card_link" key={index}>
                                    <UserListItem
                                        isUserLoggedIn={isUserLoggedIn}
                                        userList={loggedUserFollowingList}
                                        userInfo={userInfo}
                                    />
                                </a>
                            </PageLink>
                        )) :
                        <div className="not_available_message ">Your are not following anyone</div>
                    : null
            }
        </div>
    )

}

export default UserListWrapper;
