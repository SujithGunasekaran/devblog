import { useEffect } from 'react';
import { prettyUserName, convertFullDateToShort } from '../../utils';
import PageLink from '../PageLink';

const CommentItem = (props) => {

    const { commentInfo } = props;

    useEffect(() => {
        const childElement = document.querySelector('#childID');
        childElement.addEventListener('click', function (e) {
            if (e.target.closest('.post_id_middle_comment_parent_container')) {
                e.preventDefault();
                const parentPost = childElement.dataset.parentid;
                document.querySelector(`#parent_${parentPost}`).scrollIntoView({ behavior: 'smooth' });
            }
        });
    }, [])

    return (
        <div className="post_id_middle_comment_card_container">
            <img src={commentInfo.userinfo.userprofile} className="user_profile"></img>
            <div className="post_id_middle_comment_card" id={`parent_${commentInfo._id}`}>
                <div className="post_id_middle_comment_user_info">
                    <PageLink href='/user/[userID]' as={`/user/${commentInfo?.userinfo._id ?? ''}`}>
                        <a>
                            <div className="post_id_middle_comment_username">{prettyUserName(commentInfo?.userinfo.username)}</div>
                        </a>
                    </PageLink>
                    <div className="post_id_middle_comment_date">{convertFullDateToShort(commentInfo.createdAt)}</div>
                </div>
                {
                    commentInfo.parentreplyinfo &&
                    <div className="post_id_middle_comment_parent_container" data-parentid={commentInfo.parentreplyinfo._id} id="childID" title='Go to that post'>
                        <div className="post_id_middle_comment_parent_heading_container">
                            <div className="post_id_middle_comment_parent_heading">Replied To :</div>
                            <div className="parent_username">{prettyUserName(commentInfo.parentreplyinfo.userinfo.username)}</div>
                        </div>
                        <div className="parent_content">{commentInfo?.parentreplyinfo?.content ?? ''}</div>
                    </div>
                }
                <div className="post_id_middle_comment_content">{commentInfo?.content ?? ''}</div>
            </div>
        </div >
    )

}

export default CommentItem;
