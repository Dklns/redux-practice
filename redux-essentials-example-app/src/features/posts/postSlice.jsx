import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../../api/client';

const initialState = {
    posts: [],
    status: "idle",
    error: null
}

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        postUpdated(state,action) {
            const {id, title, content} = action.payload;
            const existingPost = state.posts.find(post => post.id === id);

            if(existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(state,action) {
            const {postId, reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);

            if(existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // 我们可以直接将新的帖子对象添加到我们的帖子数组中
                state.posts.push(action.payload)
            })
    }
})

export const {postAdded, postUpdated, reactionAdded} = postSlice.actions;

export default postSlice.reducer;

export const selectAllPosts = state => state.posts.posts;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data;
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // payload 创建者接收部分“{title, content, user}”对象
    async initialPost => {
        // 我们发送初始数据到 API server
        const response = await client.post('/fakeApi/posts', initialPost)
        // 响应包括完整的帖子对象，包括唯一 ID
        return response.data
    }
)