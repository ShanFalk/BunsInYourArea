const GET_REVIEWS = 'review/GET_REVIEWS';
const POST_REVIEW = 'review/GET_REVIEWS';

const retrieveAll = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const createOne = (review) => ({
    type: POST_REVIEW,
    review
});

export const createReview = (payload) => async (dispatch) => {

    const {
        reviewer_id,
        reviewee_id,
        rating,
        content
        } = payload

    const form = new FormData();
    form.append()

    const response = await fetch('/api/reviews', {

    })
}

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
