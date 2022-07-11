const ADD_LIKE = 'like/ADD_LIKE'
const GET_LIKES = 'like/GET_LIKES'
const REMOVE_LIKE = 'like/REMOVE_LIKE'

const retreiveAll = (likes) => ({
    type: GET_LIKES,
    likes
});

const createOne = (like) => ({
    type: ADD_LIKE,
    like
})

const removeOne = (bunId) => ({
    type: REMOVE_LIKE,
    bunId
})

export const unlike = (likeId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        if(data.errors){
          return;
        }
        console.log('THIS IS THE DATA', data)
        dispatch(removeOne(data))
    }
}

export const like = (payload) => async (dispatch) => {
    const response = await fetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
        dispatch(createOne(data));
        return data
      }
}

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
        case ADD_LIKE:
            return {...state, [action.like.bunny_id] : action.like}
        case REMOVE_LIKE:
            const newState = {...state}
            delete newState[action.bunId.bunny_id]
            return newState
        default:
            return state;
    }
}
