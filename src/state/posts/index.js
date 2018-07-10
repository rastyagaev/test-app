import {baseURL} from '../utils'

const GET_POST_START = 'GET_POST_START'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_FAIL = 'GET_POST_FAIL'

export const fetchPost = id => {
  return fetch(baseURL(`/api/posts/${id}`)).then(response => response.text())
}

export const getPost = id => dispatch => {
  dispatch({type: GET_POST_START, id})

  fetchPost(id)
    .then(response => {
      if (!response) {
        dispatch({type: GET_POST_FAIL, id})
      }

      dispatch({type: GET_POST_SUCCESS, id, response})
    })
}

const initialState = {
  posts: {}
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_SUCCESS:
      const newState = {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: action.response
        }
      }
      return newState
    default:
      return state
  }
}
