import { useGetTagList } from '../apollo/apolloActions';
import withApollo from '../hoc/withApollo';

const TagList = () => {

    const { data: tags, loading: tagsLoading, error: tagsError } = useGetTagList();

    return (
        <div className="home_left_dev_popular_container">
            <div className="home_left_dev_popular_heading">Popular Tags</div>
            {
                tags && tags.getTagList && tags.getTagList.taglist.length > 0 &&
                tags.getTagList.taglist.map((tagName, index) => (
                    <div key={index} className="home_left_dev_popular_list"># {tagName}</div>
                ))
            }
            {tagsError && <div></div>}
        </div>
    )

}

export default withApollo(TagList);
