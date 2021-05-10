import * as Type from '../constant/type'

export const postReducer = (state,action) => {
    const {type,payload} = action;
    switch (type) {
        case Type.GET_POSTS_SUCCESS:
            return {...state,posts:payload,postLoading:false};
        case Type.GET_POSTS_FAILED:
            return {...state,posts:[],postLoading:false}
        case Type.CREATE_POST:
            return {...state,posts:[...state.posts,payload]}
        case Type.DELETE_POST:
            return {...state,posts:state.posts.filter(post => post.id !== payload)};
        case Type.UPDATE_POST:
            const newPost = state.posts.map(post => post._id===payload._id ? payload:post);
            return {...state,post:newPost}
        case Type.FIND_POST:
            return {...state,post:payload}
        default:
            return state;
    }
}