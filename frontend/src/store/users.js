import { csrfFetch } from './csrf';

const LOAD_ALL_USERS = '/users/loadAll'

const loadUsers = users => {
    return {
        type: LOAD_ALL_USERS,
        users
    }
}

export const getAllUsers =  () => async (dispatch) => {
    const response = await csrfFetch('/api/users')
    
    if(response.ok){
        const users = await response.json()
        dispatch(loadUsers(users))
    }
}

const UsersReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_USERS:
            const newState = {}
            action.users.forEach(user => newState[user.id] = user)
            return newState;
        default:
            return state
    }
}

export default UsersReducer;