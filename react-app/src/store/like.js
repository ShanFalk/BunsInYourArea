const ADD_LIKE = 'like/ADD_LIKE'
const GET_LIKES = 'like/GET_LIKES'
const REMOVE_LIKE = 'like/REMOVE_LIKE'

const retreiveAll = (likes) => ({
    type: GET_LIKES,
    likes
});

export const getLikes = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/likes`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }

        dispatch(retreiveAll(data));
      }
}

const initialState = {};

export default function likesReducer(state = initialState, action) {
    switch(action.type) {
        case GET_LIKES:
            return { ...state, ...action.likes }
        default:
            return state;
    }
}
