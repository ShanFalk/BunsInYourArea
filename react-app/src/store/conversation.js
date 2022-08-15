const GET_CONVERSATIONS = '/conversation/GET_CONVERSATIONS';
// const CREATE_CONVERSATION = '/conversation/CREATE_CONVERSATION';

const retrieveAll = (conversations) => ({
    type: GET_CONVERSATIONS,
    conversations
});

// const createOne = (conversation) => ({

// })

export const createConversation = (payload) => async (dispatch) => {
    const response = await fetch('/api/conversations', {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
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
        default:
            return state;
    }
}
