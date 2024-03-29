const GET_REVIEWS = 'review/GET_REVIEWS';
const POST_REVIEW = 'review/POST_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';

const retrieveAll = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const createOne = (review) => ({
    type: POST_REVIEW,
    review
});

const removeOne = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        if(data.errors){
            return;
        }
        if(data.Successful) dispatch(removeOne(reviewId));
        return data;
    }
}

export const updateReview = (payload) => async (dispatch) => {
    const {
        id,
        reviewer_id,
        reviewee_id,
        rating,
        content
    } = payload

    const form = new FormData();
    form.append('id', id)
    form.append('reviewer_id', reviewer_id)
    form.append('reviewee_id', reviewee_id)
    form.append('rating', rating)
    form.append('content', content)

    const response = await fetch('/api/reviews', {
        method: 'PUT',
        body: form
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            throw(data);
        }
        dispatch(createOne(data));
        return data

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            throw (data);
        }
    }
}

export const createReview = (payload) => async (dispatch) => {
    const {
        reviewer_id,
        reviewee_id,
        rating,
        content
        } = payload

    const form = new FormData();
    form.append('reviewer_id', reviewer_id)
    form.append('reviewee_id', reviewee_id)
    form.append('rating', rating)
    form.append('content', content)

    const response = await fetch('/api/reviews', {
        method: 'POST',
        body: form
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            throw (data);
        }
        dispatch(createOne(data));
        return data

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            throw (data);
        }
    }
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
        case POST_REVIEW:
            return {...state, [action.review.id]: action.review}
        case DELETE_REVIEW:
            let newState = {...state}
            delete newState[action.reviewId]
            return newState
        default:
            return state;
    }
}
