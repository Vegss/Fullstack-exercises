import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    like(state, action) {
      return state.map(b => b.id === action.payload ? { ...b, likes: b.likes+1 } : b)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const repsonseBlog = await blogService.create(blog)
      dispatch(addBlog(repsonseBlog))
      dispatch(createNotification(`a new blog ${blog.title} added`, 'success'))
    } catch (err) {
      console.log(err)
      dispatch(createNotification(err.response.data.error, 'error'))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      dispatch(removeBlog(id))
      await blogService.deleteBlog(id)
      dispatch(createNotification('Blog deleted successfully.', 'success'))
    } catch (err) {
      dispatch(createNotification(err.response.data.error, 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    dispatch(like(blog.id))
    await blogService.update({ ...blog, likes: blog.likes+1 })
  }
}


export const { setBlogs, addBlog, removeBlog, like } = blogSlice.actions

export default blogSlice.reducer