import moment from 'moment';

export const checkIsUserLikedPost = (postid, userLikedList) => {

    let postID = null;

    if (userLikedList && userLikedList.userLikedPost && userLikedList.userLikedPost.userLikedPostList.length > 0) {
        const { userLikedPost: { userLikedPostList } } = userLikedList;

        postID = userLikedPostList.find(ID => ID.postid === postid);
    }

    return postID ? true : false;

}


/**
 *  Function Converts 12/06/2021 or any format To -> Jun 6 ( month, date ) 
*/

export const convertFullDateToShort = (date) => {
    return date ? moment(+date).format('MMM D') : null;
}
