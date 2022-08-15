const GET_ALL = 'user/GET_ALL';

const getAll = (users) => ({
    type: GET_ALL,
    users
})

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users');

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getAll(data));
    }
    return;

}

const initialState = {};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {...state, ...action.users}
        default:
            return state;
    }
}
