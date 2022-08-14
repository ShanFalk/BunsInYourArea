const GET_MESSAGES = '/message/GET_MESSAGES';

const retrieveAll = (messages) => ({
    type: GET_MESSAGES,
    messages
})

export const getAllMessages = (id) => async (dispatch) => {
    const response = await fetch (`/api/conversations/${id}/messages`)

    if(response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(retrieveAll(data));
    }
}

const initialState = {isLoaded:false}

export default function messageReducer(state=initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            const messages = action.messages;
            return {...messages, isLoaded:true}
        default:
            return state
    }
}
