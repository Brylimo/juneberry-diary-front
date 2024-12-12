import { createAction, handleActions } from "redux-actions";

const INITIALIZE = 'blog/INITIALIZE';
const CHANGE_BLOG_FIELD = 'blog/CHANGE_BLOG_FIELD';
const STORE_BLOG = 'blog/STORE_BLOG';

export const initialize = createAction(INITIALIZE);
export const changeBlogField = createAction(CHANGE_BLOG_FIELD, ({ key, value }) => ({
    key,
    value
}))
export const storeBlog = createAction(STORE_BLOG);

const initialState = {
    blogId: null,
    blogName: null,
    tempCnt: 0,
    tempPosts: [],
    categories: []
}

const blog = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [STORE_BLOG]: (state, {payload: {blogId, blogName}}) => ({
            ...state,
            blogId: blogId,
            blogName: blogName
        }),
        [CHANGE_BLOG_FIELD]: (state, { payload: {key, value} }) => ({
            ...state,
            [key]: value,
        })
    },
    initialState
)

export default blog;