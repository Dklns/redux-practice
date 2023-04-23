import { useSelector } from "react-redux";
import { selectPostIds, getPostError, getPostStatus} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";


const PostsList = () => {

    const orderedPostIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);

    let content;
    if(postStatus === 'loading') {
        content = <p>Loading....</p>
    } else if (postStatus === 'succeeded') {
        content = orderedPostIds.map((id,index) => <PostsExcerpt key={id + index} postId={id}/>)
    } else if(postStatus === 'failed') {
        content = <p>{postError}</p>
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default PostsList;