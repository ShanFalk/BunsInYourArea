const GET_BUNNIES = 'bunny/GET_BUNNIES';

const retrieveAll = (bunnies) => ({
    type: GET_BUNNIES,
    bunnies
});

export const getAllBunnies = () => async (dispatch) => {
    console.log('THIS IS THE THUNK')
    const response = await fetch('/api/bunnies');
    console.log('THIS IS THE RESPONSE', response)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

        dispatch(retrieveAll(data));
    }
}

const initialState = {};


export default function bunnyReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BUNNIES:
            const bunnies = action.bunnies
            return { ...state, ...bunnies }
        default:
            return state;
    }
}
