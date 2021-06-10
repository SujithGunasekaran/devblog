
export const checkIsUserLikedPost = (postid, userLikedList) => {

    let postID = null;

    if (userLikedList && userLikedList.userLikedPost && userLikedList.userLikedPost.userLikedPostList.length > 0) {
        const { userLikedPost: { userLikedPostList } } = userLikedList;

        postID = userLikedPostList.find(ID => ID.postid === postid);
    }

    return postID ? true : false;

}
