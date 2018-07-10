import {baseURL} from '../utils'

const CHECK_SESSION_SUCCESS = 'CHECK_SESSION_SUCCESS'
const CHECK_SESSION_FAIL = 'CHECK_SESSION_FAIL'

const getCookie = name => {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

const setCookie = (name, value, days) => {
  const d = new Date()
  d.setTime(d.getTime() + 24*60*60*1000*days)
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()
}

const deleteCookie = name => setCookie(name, '', -1)

export const signIn = () => dispatch => {
  setCookie('user_session', '1234567890', 365)
  dispatch(checkSession())
}

export const signOut = () => dispatch => {
  deleteCookie('user_session')
  dispatch(checkSession())
}

export const checkSession = () => dispatch => {
  const sessionId = getCookie('user_session')
  const body = new URLSearchParams()
  body.append('sessionId', sessionId)

  fetch(
    baseURL('/api/session/check'),
    {
      body,
      credentials: 'same-origin',
      method: 'POST'
    }
  ).then(
    response => response.json()
  ).then(response => {
    if (!response.ok) {
      deleteCookie('user_session')
      dispatch({type: CHECK_SESSION_FAIL})
    }
    else {
      dispatch({type: CHECK_SESSION_SUCCESS})
    }
  })
}

const initialState = {
  signedIn: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_SESSION_SUCCESS:
      return {
        ...state,
        signedIn: true
      }
    case CHECK_SESSION_FAIL:
      return {
        ...state,
        signedIn: false
      }
    default:
      return state
  }
}
