

import { signInWithPopup } from "firebase/auth";
import {auth,provider} from '../../firebase'

export const createBlog=(state,action)=>{
    state.blogs.push(action.payload)
    console.log(action.payload+'added');

}

export const removeBlog=(state,action)=>{
    state.blogs.filter((blog)=>{
        blog.id!==action.payload
    })
}

export const getBlogs=(state,action)=>{
    state.blogs=action.payload;
}

export const login=(state,action)=>{
    state.user=action.payload.user
}

export const logout=(state)=>{
    state.user=null
}
