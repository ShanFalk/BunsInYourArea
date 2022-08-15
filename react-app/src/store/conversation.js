const GET_CONVERSATIONS = '/conversation/GET_CONVERSATIONS';
const REMOVE_CONVERSATIONS = '/conversation/REMOVE_CONVERSATIONS';

export const clearConversations = () => ({
    type: REMOVE_CONVERSATIONS
})

const retrieveAll = (conversations) => ({
    type: GET_CONVERSATIONS,
    conversations
});

export const createConversation = (payload) => async (dispatch) => {
    const response = await fetch('/api/conversations', {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          throw (data);
        }
        return data
      }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            throw (data);
        }
    }
}

export const getAllConversations = (id) => async (dispatch) => {
    const response = await fetch (`/api/users/${id}/conversations`)

    if(response.ok){
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(retrieveAll(data));
    }
}

//what the state looks like initially
const initialState = {};

export default function conversationReducer(state = initialState, action) {
    switch(action.type) {
        case GET_CONVERSATIONS:
            const conversations = action.conversations;
            return {...state, ...conversations}
        case REMOVE_CONVERSATIONS:
            return {}
        default:
            return state;
    }
}
