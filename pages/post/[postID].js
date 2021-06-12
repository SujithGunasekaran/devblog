import { useRouter } from 'next/router';
import HeaderTag from '../../components/HeadTag';
import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetPostById } from '../../apollo/apolloActions';

const PostInfo = () => {

    const router = useRouter();
    const { postID } = router.query;

    const { data, loading, error } = useGetPostById(postID);

    return (
        <div>
            <HeaderTag
                isLogoNameNeeded={false}
                title={"Post Info"}
                description={"Get knowledge from the amazing developer posts"}
                keyword={"React.js, Javascript, devBlog, devBlog Heroku"}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        Left Panel
                    </div>
                    <div className="col-md-6">
                        Post info
                    </div>
                    <div className="col-md-3">
                        Post created user detail
                    </div>
                </div>
            </div>
            {
                error && <div></div>
            }
        </div>
    )

}

export default withApollo(PostInfo, { getDataFromTree });
