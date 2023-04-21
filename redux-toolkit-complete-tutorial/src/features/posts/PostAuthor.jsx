import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({userId}) => {
    const author = useSelector(selectAllUsers).find(user => user.id === userId);

    return (
        <span>by {author ? author.name : "Unknown author"}</span>
    )
}

export default PostAuthor