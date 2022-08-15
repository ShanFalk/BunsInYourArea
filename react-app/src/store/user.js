const GET_USER = 'user/GET_USER';
const REMOVE_USER = 'user/REMOVE_USER';


const getOne = (user) => ({
    type: GET_USER,
    user
});


export const clearUser = () => ({
    type: REMOVE_USER
})

export const getUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getOne(data));
    }
    return;
}

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            const user = action.user
            return {...state, ...user}
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
}
