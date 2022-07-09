const GET_REVIEWS = 'user/GET_REVIEWS';

const retrieveAll = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

export const getReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews')

    if(response.ok) {
        const data = await response.json()
        if(data.errors){
            return;
        }
        dispatch(retrieveAll(data));
        return data;
    }
}

const initialState = { };

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            const reviews = action.reviews
            return {...state, ...reviews}
        default:
            return state;
    }
}
